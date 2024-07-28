import { Pinecone } from '@pinecone-database/pinecone';
import { convertToAscii } from './utils';
import { getEmbeddings } from './embeddings';

export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {
    console.log('Starting getMatchesFromEmbeddings');
    console.log('File key:', fileKey);
    
    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!,
    });

    try {
        const pineconeIndex = await pinecone.index("chatpdf");
        console.log('Pinecone index accessed');
        
        const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
        console.log('Namespace:', convertToAscii(fileKey));
        
        const queryResult = await namespace.query({
            topK: 5,
            vector: embeddings,
            includeMetadata: true,
        });
        console.log('Query result:', queryResult);

        return queryResult.matches || [];
    } catch (error) {
        console.error('Error getting matches from embeddings', error);
        throw error;
    }
}

export async function getContext(query: string, fileKey: string) {
    console.log('Starting getContext');
    console.log('Query:', query);
    console.log('File key:', fileKey);
    
    try {
        const queryEmbeddings = await getEmbeddings(query);
        console.log('Query embeddings generated');
        
        const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);
        console.log('Matches:', matches);

        const qualifyingDocs = matches.filter(
            (match) => match.score && match.score > 0.25
        );
        console.log('Qualifying docs:', qualifyingDocs);

        type Metadata = {
            text: string;
            pageNumber: number;
        };

        let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
        console.log('Extracted texts:', docs);
        
        const context = docs.join("\n").substring(0, 3000);
        console.log('Final context:', context);
        
        return context;
    } catch (error) {
        console.error('Error in getContext:', error);
        throw error;
    }
}
'use client'
import { Inbox, Loader, Loader2 } from 'lucide-react'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadToS3 } from './s3'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type Props = {}

const FileUpload = () => {
    const router = useRouter();
    const [uploading, setUploading] = React.useState(false)
    const { mutate, isPending } = useMutation({
        mutationFn: async ({
            file_key,
            file_name
        }: {
            file_key: string,
            file_name: string
        }) => {
            const response = await axios.post('/api/create-chat', {
                file_key,
                file_name
            });
            return response.data;
        },
    });


    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'application/pdf': [".pdf"] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0]
            if (file.size > 10 * 1024 * 1024) {
                // if file size bigger then 10mb
                toast.error('file too large ( max size is 10mb)')
                return
            }

            setUploading(true);

            try {
                const data = await uploadToS3(file)
                if (!data?.file_key || !data?.file_name) {
                    toast.error('something went wrong');
                    return;
                }
                mutate(data, {
                    onSuccess: ({chat_id}) => {
                        toast.success('Chat created!');
                        router.push(`/chat/${chat_id}`)
                    },
                    onError: (err) => {
                        toast.error('Error creating chat');
                        console.error(err);
                    }
                })

            } catch (error) {
                console.log(error);
            } finally {
                setUploading(false);
            }

        }
    })

    return (
        <div className='p-2 bg-white rounded-xl'>
            <div {...getRootProps({
                className: 'border-dashed border-2 rounded-xl cursor-pointer bg-grey-50 py-8 flex justify-center items-center flex-col',
            })}>
                <input {...getInputProps()} />
                {(uploading || isPending) ? (<>
                    {/* loading state */}
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    <p className='mt-2 text-sm text-slate-400'>
                        uploading PDF...
                    </p>
                </>) : (
                    <>
                        <Inbox className="w-10 h-10 text-blue-700" />
                        <p className='mt-2 text-sm text-slate-400'>Drop PDF Here</p>
                    </>
                )}

            </div>
        </div>
    )
}

export default FileUpload
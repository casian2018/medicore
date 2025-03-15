import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Response {
    user: string;
    date: string;
    title: string;
    content: string;
    images: Record<string, unknown>;
}

interface Post {
    _id: string;
    title: string;
    date: string;
    content: string;
    tags: string[];
    images: Record<string, unknown>;
    responses: Response[];
}

export default function ForumPage() {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (id) {
            // Fetch post data from API or server
            fetch(`/api/forum/${id}`)
                .then(response => response.json())
                .then(data => setPost(data));
        }
    }, [id]);

    console.log(post?.title)

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="p-5 max-w-3xl mx-auto">
                <h1 className="text-3xl mb-4">{post.title}</h1>
                <p className="text-lg mb-8">{post.content}</p>
                <h2 className="text-2xl mb-4">Responses</h2>
                <ul className="list-none p-0">
                    {post.responses && post.responses.map(response => (
                        <li key={response.date} className="mb-5 p-4 border border-gray-300 rounded-lg">
                            <h3 className="text-xl mb-2">{response.title}</h3>
                            <p className="text-base mb-2">{response.content}</p>
                            <small className="text-gray-600">by {response.user} on {new Date(response.date).toLocaleDateString()}</small>
                        </li>
                    ))}
                </ul>
            </div>
                        
        </>
    );
}
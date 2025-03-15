import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import Nav from '@/components/nav';
import Footer from '@/components/footer';

interface Response {
    user: string;
    date: string;
    title: string;
    content: string;
    images: Record<string, unknown>;
}

interface Post {
    user: ReactNode;
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
    const [comment, setComment] = useState('');
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/forum/${id}`)
                .then(response => response.json())
                .then(data => setPost(data));
        }
    }, [id]);

    useEffect(() => {
        fetch('/api/profile/user')
            .then(response => response.json())
            .then(data => setUser(data.username))
            .catch(() => setUser(null));
    }, []);

    const handleCommentSubmit = async () => {
        if (!comment.trim() || !user) return;
        
        const newResponse = {
            user,
            date: new Date().toISOString(),
            title: 'User Response',
            content: comment,
            images: {}
        };

        const response = await fetch(`/api/forum/${id}/response`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newResponse)
        });

        if (response.ok) {
            setPost(prev => prev ? { ...prev, responses: [...prev.responses, newResponse] } : null);
            setComment('');
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Nav />
            <div className="bg-white min-h-screen p-6">
                <div className="max-w-3xl mx-auto bg-gray-50 shadow-md rounded-lg p-6 border border-gray-200 mt-20">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {post.tags[0]}
                        </div>
                        <span className="text-gray-600 text-sm">Posted by {post.user} • {new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
                    <p className="text-gray-700 mt-2">{post.content}</p>
                    <div className="flex space-x-6 mt-4 text-gray-600">
                        <button className="flex items-center space-x-1 hover:text-red-600">
                            <span>⬆️ 20K</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-red-600">
                            <span>💬 {post.responses.length}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-red-600">
                            <span>⭐ 1</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-red-600">
                            <span>🔗 Share</span>
                        </button>
                    </div>
                    <h2 className="mt-6 text-lg font-semibold text-gray-900">Responses</h2>
                    <div className="mt-4 space-y-4">
                        {post.responses.map((response, index) => (
                            <div key={index} className="bg-gray-50 border-l-4 border-red-600 p-4 shadow-sm rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-gray-900">{response.user}</span>
                                    <span className="text-gray-500 text-sm">• {new Date(response.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-700 mt-2">{response.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                        />
                        <button
                            onClick={handleCommentSubmit}
                            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
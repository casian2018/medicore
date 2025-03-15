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
            <div className="bg-white text-gray-900 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Advances in Neuroplasticity Research
        </h1>
        <p className="text-gray-700 mb-6">
          Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections.
          Recent studies show how this process can aid in recovery after brain injury or stroke.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Responses</h2>

        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">
              Fascinating Development
            </h3>
            <p className="text-gray-700 mt-2">
              The concept of neuroplasticity has been pivotal in rehabilitation therapies.
              Looking forward to seeing more clinical applications.
            </p>
            <p className="text-sm text-gray-600 mt-3">
              by <span className="font-semibold text-red-600">Dr. Smith</span> on 11.03.2025
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">
              Neuroplasticity and Aging
            </h3>
            <p className="text-gray-700 mt-2">
              It's also crucial to research how neuroplasticity can slow the cognitive decline associated with aging.
            </p>
            <p className="text-sm text-gray-600 mt-3">
              by <span className="font-semibold text-red-600">Dr. Allen</span> on 12.03.2025
            </p>
          </div>
        </div>
      </div>
    </div>
                        
        </>
    );
}
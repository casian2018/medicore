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
             <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
        {/* Forum Header */}
        <div className="flex items-center jus space-x-3 mb-4">
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Neuroplasticity
          </div>
          <span className="text-gray-600 text-sm">Posted by Dr_Neuroscience • 3 days ago</span>
        </div>

        {/* Main Post */}
        <h1 className="text-2xl font-bold text-gray-900">
          Advances in Neuroplasticity Research
        </h1>
        <p className="text-gray-700 mt-2">
          Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections.
          Recent studies show how this process can aid in recovery after brain injury or stroke.
        </p>

        {/* Engagement Buttons */}
        <div className="flex space-x-6 mt-4 text-gray-600">
          <button className="flex items-center space-x-1 hover:text-red-600">
            <span>⬆️ 20K</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-red-600">
            <span>💬 21K</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-red-600">
            <span>⭐ 1</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-red-600">
            <span>🔗 Share</span>
          </button>
        </div>

        {/* Comment Section */}
        <h2 className="mt-6 text-lg font-semibold text-gray-900">Responses</h2>

        <div className="mt-4 space-y-4">
          {/* Comment 1 */}
          <div className="bg-gray-50 border-l-4 border-red-600 p-4 shadow-sm rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-900">Dr. Smith</span>
              <span className="text-gray-500 text-sm">• 11.03.2025</span>
            </div>
            <p className="text-gray-700 mt-2">
              The concept of neuroplasticity has been pivotal in rehabilitation therapies.
              Looking forward to seeing more clinical applications.
            </p>
          </div>

          {/* Comment 2 */}
          <div className="bg-gray-50 border-l-4 border-red-600 p-4 shadow-sm rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-900">Dr. Allen</span>
              <span className="text-gray-500 text-sm">• 12.03.2025</span>
            </div>
            <p className="text-gray-700 mt-2">
              It's also crucial to research how neuroplasticity can slow the cognitive decline associated with aging.
            </p>
          </div>
        </div>

        {/* Add a Comment */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
          />
        </div>
      </div>
    </div>
                        
        </>
    );
}
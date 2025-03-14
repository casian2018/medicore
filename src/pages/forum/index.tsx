import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/sidebar";

const Forum = () => {
    const router = useRouter();
    const [tags] = useState([
        "Neuro",
        "Cardio",
        "Oncology",
        "Pediatrics",
        "Dermatology",
        "Gastroenterology",
        "Endocrinology",
        "Rheumatology",
        "Nephrology",
        "Hematology",
    ]);
    const [selectedTag, setSelectedTag] = useState(tags[0]);
    const [posts, setPosts] = useState<
        { _id: string; title: string; content: string }[]
    >([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedTag) {
            setLoading(true);
            setTimeout(() => {
                fetch(`/api/forum/posts?tag=${selectedTag}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setPosts(data);
                        setLoading(false);
                    });
            }, 2000);
        }
    }, [selectedTag]);

    const handleAddPost = () => {
        router.push("/forum/addPost");
    };

    return (
        <div className="flex h-screen">
            <Sidebar
                tags={tags}
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
            />
            <div className="w-5/6 p-4 overflow-y-auto h-screen bg-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Posts about {selectedTag}</h1>
                    <button
                        onClick={handleAddPost}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Add Post
                    </button>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <div
                            key={post._id}
                            className="p-4 mb-4 border rounded shadow bg-white"
                        >
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-gray-700">{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts available for this tag.</p>
                )}
            </div>
        </div>
    );
};

export default Forum;

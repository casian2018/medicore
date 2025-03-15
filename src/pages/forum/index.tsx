import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import Nav from "@/components/nav"
import Footer from "@/components/footer"

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
        <>
            <Nav />
            <div className="flex flex-col min-h-screen bg-white">
                <div className="flex flex-1 overflow-hidden pt-8">
                    {/* Sidebar */}
                    <div className="w-64 bg-gray-50 shadow-sm overflow-y-auto">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="font-medium text-gray-600 uppercase text-xs">Medical Topics</h2>
                        </div>
                        <div className="py-2">
                            {tags.map((tag) => (
                                <div 
                                    key={tag}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedTag(tag)}
                                    onKeyDown={(e) => e.key === 'Enter' && setSelectedTag(tag)}
                                    className={`px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors rounded-md my-1 mx-2 ${
                                        selectedTag === tag 
                                            ? "bg-blue-50 border-l-4 border-[#FF4500] font-medium text-gray-900" 
                                            : "text-gray-700"
                                    }`}
                                    aria-selected={selectedTag === tag}
                                    aria-label={`Select ${tag} category`}
                                >
                                    <div className="flex items-center">
                                        <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF8717] mr-3 flex-shrink-0"></span>
                                        {tag}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
                        <div className="max-w-3xl mx-auto pt-12">
                            <div className="bg-gray-50 rounded-lg shadow-sm p-4 mb-5 flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF8717] mr-4 flex-shrink-0"></div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{selectedTag}</h2>
                                    <p className="text-sm text-gray-600">Medical discussions and resources</p>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex justify-center my-12 flex-col items-center">
                                    <div className="w-16 h-16 border-4 border-[#FF4500] border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-gray-700 font-medium">Loading discussions...</p>
                                </div>
                            ) : posts.length > 0 ? (
                                <div className="space-y-4">
                                    {posts.map((post) => (
                                        <div 
                                            key={post._id} 
                                            className="bg-gray-50 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-[#FF4500]"
                                            onClick={() => router.push(`/forum/page/${post._id}`)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => e.key === 'Enter' && router.push(`/forum/page/${post._id}`)}
                                        >
                                            <div className="flex p-4">
                                                {/* Voting buttons */}
                                                <div className="flex flex-col items-center mr-4">
                                                    <button 
                                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#FF4500] hover:bg-orange-50 rounded transition-colors"
                                                        aria-label="Upvote post"
                                                    >
                                                        <FaArrowUp size={16} />
                                                    </button>
                                                    <span className="text-sm font-medium my-1 text-center" aria-label="Post score">0</span>
                                                    <button 
                                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                        aria-label="Downvote post"
                                                    >
                                                        <FaArrowDown size={16} />
                                                    </button>
                                                </div>

                                                {/* Post content */}
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-2">
                                                        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF8717] mr-2"></div>
                                                        <span className="text-xs text-gray-600" aria-label="Post author and time">
                                                            Posted by <span className="text-gray-900 hover:underline">Anonymous User</span> • 1h
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-medium mb-2 text-gray-900">
                                                        {post.title}
                                                    </h3>
                                                    <div className="text-sm text-gray-700 mb-2">
                                                        {post.content.length > 200 
                                                            ? post.content.substring(0, 200) + "..." 
                                                            : post.content}
                                                    </div>
                                                    <div className="flex items-center text-gray-600 text-xs">
                                                        <div className="flex items-center mr-4 hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                            <FaComment className="mr-1" />
                                                            <span>0 Comments</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-md shadow p-8 text-center">
                                    <p className="text-gray-600">No posts found for this topic</p>
                                    <button 
                                        onClick={handleAddPost}
                                        className="mt-4 bg-[#FF4500] text-white font-medium px-4 py-2 rounded-full text-sm hover:bg-[#ff5414] transition-colors"
                                    >
                                        Create the first post
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Forum;
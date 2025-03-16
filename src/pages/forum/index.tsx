import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaArrowUp, FaArrowDown, FaComment, FaBars, FaTimes, FaPlus } from "react-icons/fa";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

interface Post {
    _id: string;
    title: string;
    content: string;
    profilePic: string;
    responses: any[];  // Added responses field to the interface
}

const Forum = () => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    const [posts, setPosts] = useState<Post[]>([]);  // Updated type definition
    const [loading, setLoading] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        if (selectedTag) {
            setLoading(true);
            setTimeout(() => {
                fetch(`/api/forum/posts?tag=${selectedTag}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setPosts(
                            data.map((post: any, index: number) => ({
                                ...post,
                                profilePic: `https://i.pravatar.cc/150?img=${index + 1}`,
                            }))
                        );
                        setLoading(false);
                    });
            }, 500);
        }
    }, [selectedTag]);

    return (
        <>
            <Nav />
            <div className="flex flex-col min-h-screen bg-white">
                {/* Mobile Menu Button */}
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden fixed top-20 left-4 z-50 p-3 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-all"
                    aria-label="Toggle navigation"
                >
                    {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>

                <div className="flex flex-1 overflow-hidden pt-8">
                    {/* Sidebar Backdrop */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                            onClick={toggleSidebar}
                            aria-hidden="true"
                        />
                    )}

                    {/* Sidebar */}
                    <div className={`lg:w-72 w-64 fixed lg:relative h-full lg:h-auto z-40 bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out mt-13 
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="font-semibold text-gray-800 text-lg">Medical Topics</h2>
                            <FaTimes
                                className="lg:hidden cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                                onClick={toggleSidebar}
                                size={18}
                            />
                        </div>
                        <div className="py-4 px-2">
                            {tags.map((tag) => (
                                <div
                                    key={tag}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => {
                                        setSelectedTag(tag);
                                        setIsSidebarOpen(false);
                                    }}
                                    onKeyDown={(e) => e.key === "Enter" && setSelectedTag(tag)}
                                    className={`px-4 py-3 cursor-pointer hover:bg-red-50 transition-all rounded-lg my-1 mx-2 ${selectedTag === tag
                                            ? "bg-red-600 text-white hover:bg-red-700 shadow-md"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                    aria-selected={selectedTag === tag}
                                    aria-label={`Select ${tag} category`}
                                >
                                    <div className="flex items-center">
                                        <span className={`h-2 w-2 rounded-full mr-3 ${selectedTag === tag ? 'bg-white' : 'bg-red-600'}`}></span>
                                        <span className="font-medium">{tag}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50 lg:ml-0 mt-8 lg:mt-0">
                        <div className="max-w-3xl mx-auto pt-12">
                            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex items-center border border-gray-100">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 mr-4 flex-shrink-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">{selectedTag[0]}</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedTag}</h2>
                                    <p className="text-sm text-gray-600">Join the discussion about {selectedTag.toLowerCase()} medicine</p>
                                </div>
                            </div>

                            {/* Create Post Button */}
                            <div className="fixed bottom-8 right-8 z-30">
                                <button
                                    onClick={() => router.push('/forum/addPost')}
                                    className="bg-red-600 text-white font-semibold px-6 py-4 rounded-full text-sm hover:bg-red-700 transition-all shadow-lg flex items-center hover:shadow-xl"
                                >
                                    <FaPlus className="mr-2" />
                                    <span className="hidden lg:inline">Create Post</span>
                                </button>
                            </div>

                            {loading ? (
                                <div className="flex justify-center my-12 flex-col items-center">
                                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-gray-700 font-medium">Loading discussions...</p>
                                </div>
                            ) : posts.length > 0 ? (
                                <div className="space-y-4 pb-16">
                                    {posts.map((post) => (
                                        <div
                                            key={post._id}
                                            className="bg-white rounded-xl shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer group border border-gray-100"
                                            onClick={() => router.push(`/forum/page/${post._id}`)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => e.key === "Enter" && router.push(`/forum/page/${post._id}`)}
                                        >
                                            <div className="flex p-4">
                                                {/* Voting buttons */}
                                                <div className="flex flex-col items-center mr-4">
                                                    <button
                                                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        aria-label="Upvote post"
                                                    >
                                                        <FaArrowUp size={18} />
                                                    </button>
                                                    <span className="text-sm font-medium my-1 text-center text-gray-700">0</span>
                                                    <button
                                                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        aria-label="Downvote post"
                                                    >
                                                        <FaArrowDown size={18} />
                                                    </button>
                                                </div>

                                                {/* Post content */}
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-3">
                                                        <img
                                                            src={post.profilePic}
                                                            alt="User Profile"
                                                            className="h-8 w-8 rounded-full object-cover mr-3 flex-shrink-0"
                                                        />
                                                        <span className="text-sm text-gray-600">
                                                            Posted by <span className="text-gray-900 font-medium hover:underline">Anonymous</span> • 1h
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h3>
                                                    <div className="text-gray-700 mb-3 leading-relaxed">
                                                        {post.content.length > 250 ?
                                                            post.content.substring(0, 250) + "..." :
                                                            post.content}
                                                    </div>
                                                    <div className="flex items-center text-gray-600 text-sm">
                                                        <div className="flex items-center mr-4 hover:bg-gray-100 px-3 py-1.5 rounded-lg cursor-pointer transition-colors">
                                                            <FaComment className="mr-2 text-red-600" />
                                                            {/* Updated comment count display */}
                                                            <span>{post.responses.length} Comments</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow p-8 text-center border border-gray-100">
                                    <div className="text-6xl text-red-600 mb-4">💬</div>
                                    <p className="text-gray-700 text-lg mb-4">No discussions found in {selectedTag}</p>
                                    <button
                                        onClick={() => router.push("/forum/addPost")}
                                        className="bg-red-600 text-white font-medium px-6 py-3 rounded-lg text-sm hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                                    >
                                        Start the conversation
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


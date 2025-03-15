import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaArrowUp, FaArrowDown, FaComment, FaBars, FaTimes } from "react-icons/fa";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

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
    const [posts, setPosts] = useState<
        { _id: string; title: string; content: string; profilePic: string }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState<string | null>(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        fetch('/api/profile/user')
            .then((res) => res.json())
            .then((data) => {
                setUserType(data.type);
            });
    }, []);

    useEffect(() => {
        if (selectedTag && userType === 'doctor') {
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
    }, [selectedTag, userType]);

    if (userType !== 'doctor') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
                <p className="text-gray-700 mb-4">You do not have permission to access this forum.</p>
                <button
                    onClick={() => router.push('/')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <>
            <Nav />
            <div className="flex flex-col min-h-screen bg-white ">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden fixed mt-2 right-4 top-20  z-50 p-2 rounded-full bg-red-600 text-white shadow-lg"
                    aria-label="Toggle navigation"
                >
                    {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>

                <div className="flex flex-1 overflow-hidden pt-8">
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                            onClick={toggleSidebar}
                            aria-hidden="true"
                        />
                    )}

                    <div className={`lg:w-64 w-64 fixed lg:relative h-full lg:h-auto z-40 bg-gray-50 shadow-sm overflow-y-auto transform transition-transform duration-300 ease-in-out mt-13 
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
                    >
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="font-medium text-gray-600 uppercase text-xs">Medical Topics</h2>
                            <FaTimes 
                                className="lg:hidden cursor-pointer text-gray-500"
                                onClick={toggleSidebar}
                            />
                        </div>
                        <div className="py-2">
                            {tags.map((tag: string) => (
                                <div
                                    key={tag}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => {
                                        setSelectedTag(tag);
                                        setIsSidebarOpen(false);
                                    }}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => e.key === "Enter" && setSelectedTag(tag)}
                                    className={`px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors rounded-md my-1 mx-2 ${
                                        selectedTag === tag
                                            ? "bg-blue-50 border-l-4 border-red-600 font-medium text-gray-900"
                                            : "text-gray-700"
                                    }`}
                                    aria-selected={selectedTag === tag}
                                    aria-label={`Select ${tag} category`}
                                >
                                    <div className="flex items-center">
                                        <span className="h-6 w-6 rounded-full bg-red-600 mr-3 flex-shrink-0"></span>
                                        {tag}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-gray-100 lg:ml-0 mt-8 lg:mt-0">
                        <div className="max-w-3xl mx-auto pt-12">
                            <div className="bg-gray-50 rounded-lg shadow-sm p-4 mb-5 flex items-center">
                                <div className="h-10 w-10 rounded-full bg-red-600 mr-4 flex-shrink-0"></div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{selectedTag}</h2>
                                    <p className="text-sm text-gray-600">Medical discussions and resources</p>
                                </div>
                            </div>
                            {loading ? (
                                <div className="flex justify-center my-12 flex-col items-center">
                                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-gray-700 font-medium">Loading discussions...</p>
                                </div>
                            ) : posts.length > 0 ? (
                                <div className="space-y-4 pb-16">
                                    {posts.map((post: { _id: string; title: string; content: string; profilePic: string }) => (
                                        <div
                                            key={post._id}
                                            className="bg-gray-50 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                                            onClick={() => router.push(`/forum/page/${post._id}`)}
                                            role="button"
                                            tabIndex={0}
                                        >
                                            <div className="flex p-4">
                                                <h3 className="text-lg font-medium mb-2 text-gray-900">{post.title}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-md shadow p-8 text-center">
                                    <p className="text-gray-600">No posts found for this topic</p>
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
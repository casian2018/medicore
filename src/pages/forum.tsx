import { useState } from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
interface ForumPost {
  id: string
  author: string
  content: string
  timestamp: Date
}

export default function DoctorForum() {
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState<ForumPost[]>([])

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return


    const tempPost: ForumPost = {
      id: Date.now().toString(),
      author: "Dr. ",
      content: newPost,
      timestamp: new Date()
    }

    setPosts([tempPost, ...posts])
    setNewPost('')
  }

  return (
    <main>  
      <Nav />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">
          Medical Discussion Forum
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-red-50">
  <form onSubmit={handleSubmitPost} className="space-y-4">
    <label className="block text-lg font-medium text-black">
      Create a New Post
    </label>
    <div className="relative">
      <textarea
        value={newPost}
        onChange={(e) => {
          if (e.target.value.length <= 1000) {
            setNewPost(e.target.value)
          }
        }}
        placeholder="Share your medical insights or ask a question..."
        className="w-full min-h-[120px] p-4 rounded-lg border-red-200 bg-red-50/20 
          shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 
          transition-all resize-y overflow-y-auto whitespace-pre-wrap break-words"
        required
        maxLength={1000}
      />
      <div className="absolute bottom-2 right-2 text-sm text-gray-500 bg-white/80 px-2 rounded">
        {newPost.length}/1000
      </div>
    </div>
    <div className="flex justify-end">
      <button
        type="submit"
        className="py-2 px-6 rounded-lg shadow-sm text-sm font-semibold 
          text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
      >
        Post to Forum
      </button>
    </div>
  </form>
</div>

      <div className="space-y-6">
        {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg border border-red-50 break-words overflow-hidden">            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-black">{post.author}</h3>
                <p className="text-sm text-gray-500">
                  {post.timestamp.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <span className="text-red-600 text-sm font-medium">Doctor</span>
            </div>
            <p className="text-black whitespace-pre-wrap break-words overflow-wrap-anywhere">
    {post.content}
  </p>
</div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No posts yet. Be the first to share!
          </div>
        )}
      </div>
    </div>
    <Footer />
    </main>
  )
}
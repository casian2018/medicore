import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

interface ForumPost {
  id: string
  author: string
  title: string
  content: string
  timestamp: Date
}

export default function DoctorForum() {
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [posts, setPosts] = useState<ForumPost[]>([])

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.title.trim() || !newPost.content.trim()) return

    const tempPost: ForumPost = {
      id: Date.now().toString(),
      author: "Dr. ",
      title: newPost.title,
      content: newPost.content,
      timestamp: new Date()
    }

    setPosts([tempPost, ...posts])
    setNewPost({ title: '', content: '' })
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
            
            <div>
              <input
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="Add a title..."
                className="w-full p-4 rounded-lg border-red-200 bg-red-50/20 
                  shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-300 
                  transition-all mb-4"
                required
                maxLength={120}
              />
              
              <div className="relative">
                <textarea
                  value={newPost.content}
                  onChange={(e) => {
                    if (e.target.value.length <= 1000) {
                      setNewPost({...newPost, content: e.target.value})
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
                  {newPost.content.length}/1000
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/forum/${post.id}`}
              className="block bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-red-50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-black">{post.author}</span>
                    <span className="text-red-500 text-xs px-2 py-1 rounded-full bg-red-50">
                      Doctor
                    </span>
                  </div>
                  <h3 className="font-medium text-black mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      {post.timestamp.toLocaleDateString()}
                    </span>
                    <span className="text-red-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      0 Replies
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-12 text-gray-500 col-span-full">
              No posts yet. Be the first to share!
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
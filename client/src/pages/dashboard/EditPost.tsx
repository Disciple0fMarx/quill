import EditPostForm from "../../components/dashboard/posts/EditPostForm"


const EditPost = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-10">
      <div className="w-full px-4 sm:px-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Edit Post</h1>
        <EditPostForm />
      </div>
    </div>
  )
}

export default EditPost
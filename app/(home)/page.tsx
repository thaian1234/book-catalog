import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "@/config/firebase";

import { Button } from "@/components/ui/button";

import { AddPostForm } from "./_components/add-post-form";

type Post = {
  id: string;
  title: string;
};

const getPosts = async () => {
  const collectionRef = collection(db, "posts");
  const postCollectionSnapshot = await getDocs(collectionRef);

  const postList: Post[] = postCollectionSnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data()?.title,
  }));

  return postList;
};

const getPostById = async (id: string) => {
  const collectionRef = doc(db, "posts", id);
  const docRef = await getDoc(collectionRef);

  if (!docRef.exists()) {
    return null;
  }

  return docRef.data() as Post;
};

export default async function HomePage() {
  const posts = await getPosts();

  console.log(posts);
  return (
    <div>
      <div>
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
      <div className="max-w-xl">
        <AddPostForm />
      </div>
    </div>
  );
}

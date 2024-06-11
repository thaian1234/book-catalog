import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "@/config/firebase";

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
  const postId = await getPostById(posts[0].id);

  console.log(postId);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

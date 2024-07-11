import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { posts } from "../data/post";

interface Post {
  id: number;
  createdAt: string;
  categories: string[];
  title: string;
  content: string;
}

// interface Props {
//   posts: Post[];
// }

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // 非同期関数を定義
    const fetchData = async () => {
      const response = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
      );

      const data = await response.json();
      setPosts(data.posts);
    };

    // 非同期関数を呼び出す
    fetchData();
  }, []);

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className="w-2/4 my-12 mx-auto p-8 outline outline-1"
          >
            <Link to={`/${post.id}`}>
              {/* //URL */}
              <div className="flex justify-between items-center">
                <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                <div className="flex justify-between items-center">
                  {post.categories.map((category: string, index: number) => (
                    <div
                      key={index}
                      className="text-sm p-1 text-blue-700 border border-solid border-1 border-blue-700 rounded-md mx-1"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              <h2>{post.title}</h2>
              <p>{renderContent(post.content)}</p>
            </Link>
          </li>
        ))}
      </ul>
      {/* <Outlet /> */}
    </>
  );
};

const renderContent = (content: string): string => {
  const homeContent = content.slice(0, 24);
  return `${homeContent}…`;
};
export default Home;

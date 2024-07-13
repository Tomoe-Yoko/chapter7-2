//https://tailwindcss.com/docs/utility-first

import React, { useEffect, useState } from "react";
// import { posts } from "../data/post";
import { useParams } from "react-router-dom";

interface PagePost {
  thumbnailUrl: string;
  title: string;
  createdAt: string;
  categories: string[];
  content: string;
}

const Page: React.FC = () => {
  // 表示したい記事のIDを指定
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PagePost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
      );

      const data = await response.json();
      setPost(data.post);
    };

    fetchPost();
  }, [id]);
  // console.log(post);
  //三項演算子（？）よりも早期リターンを使う！
  if (!post) {
    return <div>記事が見つかりませんでした</div>;
  }
  return (
    <div className="w-9/12 mx-auto my-10 max-w-screen-md">
      <img src={post.thumbnailUrl} alt={post.title} />
      <div className="flex  justify-between mt-4">
        <p> {new Date(post.createdAt).toLocaleDateString()}</p>

        <ul className="flex">
          {post.categories.map((category: string, index: number) => (
            <li
              key={index}
              className="p-1 m-1 text-blue-700 border border-solid border-blue-700 rounded"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">{renderContent(post.content)}</div>
    </div>
  );
};

const renderContent = (content: string) => {
  const paragraphs = content.split("<br/>");
  return paragraphs.map((paragraph: string, index: number) => (
    <p key={index}>{paragraph}</p>
  ));
};

export default Page;

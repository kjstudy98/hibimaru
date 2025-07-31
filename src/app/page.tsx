"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

const Home = () => {
  const router = useRouter();

  const handleClickMan = () => {
    router.push("/home");
  };

  // TODO: 必要あれば変更する
  const handleClickWoman = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* メインコンテナ */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center">
          {/* タイトル部分 */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ひびまる
              </h1>
            </div>
            <div className="text-gray-600 text-lg font-medium">
              ユーザを選択してください
            </div>
          </div>

          {/* ボタン部分 */}
          <div className="space-y-4">
            <Button
              onClick={handleClickMan}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <User />
              おとこ
            </Button>

            <Button
              onClick={handleClickWoman}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <User />
              おんな
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

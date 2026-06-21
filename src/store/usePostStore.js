//usePostStore.js : 게시물 등록 수정 삭제

import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

export const usePostStore = create((set) => ({
  // 초기 상태 정의 (여기에 게시글 목록이 담깁니다)
  posts: [],
  loading: false,

  // 로그인한 사용자 게시글 조회 api (get)
  fetchPosts: async () => {
    console.log("=== [1단계] fetchPosts 함수 시작 ===");

    const token = useAuthStore.getState().token;
    console.log("[2단계] 로컬스토리지에서 꺼낸 토큰 확인:", token);

    if (!token) {
      console.error(
        "❌ 에러: 토큰이 비어있습니다. 로그인이 안 된 상태일 수 있습니다.",
      );
      return;
    }

    set({ loading: true });

    // 백엔드로 보낼 헤더 설정값 미리 보기
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        "https://bailey44.pythonanywhere.com/audit/",
        config,
      );

      set({ posts: response.data.posts || [] });
      console.log(response.data);
    } catch (error) {
      console.error("❌ [5단계 실패] 서버가 요청을 거부했습니다.");

      // 서버가 돌려준 에러 메시지 상세 분석
      if (error.response) {
        console.error(
          "▶️ 서버 응답 에러 코드 (Status):",
          error.response.status,
        );
        console.error("▶️ 서버가 보낸 거절 사유 (Data):", error.response.data);
        console.error("▶️ 내가 보낸 요청 헤더 재확인:", error.config.headers);
      } else {
        console.error("▶️ 네트워크 자체 에러 혹은 서버 다운:", error.message);
      }
    } finally {
      set({ loading: false });
      console.log("=== [6단계] fetchPosts 함수 종료 ===");
    }
  },

  // 게시글 상세 조회
  currentPost: null, // 상세 정보를 담을 곳

  fetchPostDetail: async (id) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      console.error("❌ 토큰이 없습니다.");
      return;
    }

    set({ loading: true });

    try {
      const response = await axios.get(
        `https://bailey44.pythonanywhere.com/audit/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      set({ currentPost: response.data });
      console.log("제품 상세 조회 완료:", response.data);
    } catch (error) {
      console.error("❌ 제품 상세 조회 실패:", error);
    } finally {
      set({ loading: false });
    }
  },

  // 모달이 닫힐 때 상세 데이터를 비워주는 액션도 있으면 좋습니다.
  clearCurrentPost: () => set({ currentPost: null }),

  // 게시글 등록 api (post)
  createPost: async (postData) => {
    //access 토큰
    const token = useAuthStore.getState().token;

    try {
      // 2. "post합니다" 부분 (axios.post 사용)
      const response = await axios.post(
        `https://bailey44.pythonanywhere.com/audit/`,

        {
          title: postData.title,
          body: postData.body,
          gender: postData.gender,
          expiration_date: postData.expiration_date,
          open_date: postData.open_date,
          hashtag_names: postData.hashtag_names,
        },

        // authorization
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("게시글 등록 완료!", response.data);

      // 💡 3. [set 사용] 백엔드가 저장에 성공한 후 돌려준 새 게시글 데이터(response.data)를
      // 기존 posts 배열에 바로 합쳐서 화면을 갱신시킵니다.
      set((state) => ({
        posts: [response.data, ...state.posts], // 최신 글이 맨 위로 오도록 합치기
      }));
    } catch (error) {
      console.error("게시글 등록 실패", error);
    }
  },
}));

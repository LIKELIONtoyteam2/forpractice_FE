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
    const token = useAuthStore.getState().token;

    if (!token) {
      console.error("토큰 없음");
      return;
    }

    set({ loading: true });

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

      const fetchedData = Array.isArray(response.data)
        ? response.data
        : response.data.posts || [];

      set({ posts: fetchedData });
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
  currentPost: null,
  fetchPostDetail: async (id) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      console.error("토큰이 없습니다.");
      return;
    }

    set({ loading: true });

    try {
      const response = await axios.get(
        `https://bailey44.pythonanywhere.com/audit/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      set({ currentPost: response.data });
    } catch (error) {
      console.error("제품 상세 조회 실패:", error);
    } finally {
      set({ loading: false });
    }
  },

  clearCurrentPost: () => set({ currentPost: null }),

  // 게시글 등록 api (post)
  createPost: async (postData) => {
    //access 토큰
    const token = useAuthStore.getState().token;

    try {
      const response = await axios.post(
        `https://bailey44.pythonanywhere.com/audit/`,

        postData,

        // authorization
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("게시글 등록 완료!", response.data);

      set((state) => ({
        posts: [response.data, ...state.posts],
      }));
    } catch (error) {
      console.error("🚨 백엔드가 보낸 진짜 에러 사유:", error.response?.data);
    }
  },
}));

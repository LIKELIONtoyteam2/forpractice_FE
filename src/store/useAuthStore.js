//useAuthStore.js : 로그인, 회원가입, 내 프로필 조회 관련 로직

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useAuthStore = create(
  persist((set, get) => ({
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    signupData: { username: "", email: "", nickname: "" },

    setSignupData: (data) =>
      set((state) => ({
        signupData: {
          ...state.signupData, // 기존에 있던 필드 유지
          ...data, // 새로 들어온 필드만 변경, 추가
        },
      })),

    login: async (username, password) => {
      set({ isLoading: true });

      try {
        const response = await axios.post(
          `https://bailey44.pythonanywhere.com/accounts/login/`,
          { username, password },
        );

        const { id, username: fetchedUsername, email, access } = response.data;

        const userData = {
          id: id,
          username: fetchedUsername,
          email: email,
        };

        // localStorage 대신 Zustand 상태에 직접 저장 (persist가 자동 저장함)
        set({
          user: userData,
          token: access,
          isLoggedIn: true,
        });
        set({ user: userData, isLoggedIn: true });
      } catch (error) {
        console.error("로그인 실패", error);
      } finally {
        set({ isLoading: false });
      }
    },

    logout: () => {
      localStorage.removeItem("token");
      set({ user: null, isLoggedIn: false });
    },

    // 내 프로필 조회 api (get)
    fetchProfile: async () => {
      const token = get().token;
      const currentUser = get().user;

      if (!token) {
        console.error("❌ 토큰이 없습니다.");
        return;
      }

      if (!currentUser || !currentUser.id) {
        console.error("❌ 로그인된 유저의 ID(pk)를 찾을 수 없습니다.");
        return;
      }

      set({ isLoading: true });

      try {
        // pk = 현재 로그인한 유저의 id
        const response = await axios.get(
          `https://bailey44.pythonanywhere.com/accounts/profile/${currentUser.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // 기존 유저 정보(id, email 등)에 새로 불러온 프로필 정보(nickname 등)를 합쳐서 업데이트
        set((state) => ({
          user: {
            ...state.user,
            ...response.data,
          },
        }));
        console.log("내 프로필 조회 성공:", response.data);
      } catch (error) {
        console.error("내 프로필 조회 실패", error);
      } finally {
        set({ isLoading: false });
      }
    },

    // 내 프로필 수정
    updateProfile: async (nickname, imageFile) => {
      const token = get().token;
      const currentUser = get().user;

      if (!token || !currentUser?.id) return;

      set({ isLoading: true });

      try {
        const formData = new FormData();

        formData.append("username", currentUser.username || "");
        formData.append("nickname", nickname);

        if (imageFile) {
          formData.append("profile_image", imageFile);
        }
        //if (headerImageFile) { formData.append("header_image", headerImageFile)};

        const response = await axios.put(
          `https://bailey44.pythonanywhere.com/accounts/profile/${currentUser.id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // 파일 전송용 설정
            },
          },
        );

        // 서버에서 돌려준 최신 프로필 정보로 전역 상태 업데이트
        set((state) => ({
          user: { ...state.user, ...response.data },
        }));

        alert("프로필이 성공적으로 수정되었습니다!");
        return true; // 성공 시 true 반환
      } catch (error) {
        console.error("프로필 수정 실패", error);
        alert("프로필 수정에 실패했습니다.");
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    signup: async (username, email, nickname, password) => {
      set({ isLoading: true });

      //  백엔드 서버로 "보내기 직전"의 데이터 확인
      console.log(" [회원가입 요청 데이터]:", {
        username,
        email,
        nickname,
        password,
      });

      try {
        // 1. 회원가입 요청
        await axios.post(
          `https://bailey44.pythonanywhere.com/accounts/signup/`,
          {
            username,
            email,
            nickname,
            password,
          },
        );

        // 2. 가입 성공 시 바로 로그인 API 호출!

        await get().login(username, password);

        return true; // 성공 반환
      } catch (error) {
        const data = error.response?.data;
        console.log(data);
        console.log();
        if (data?.username) {
          alert("이미 사용 중인 아이디입니다.");
        } else if (data?.email) {
          alert("이미 사용 중인 이메일입니다.");
        } else {
          alert("회원가입에 실패했습니다.");
        }
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },
  })),
  {
    name: "auth-storage",
  },
);

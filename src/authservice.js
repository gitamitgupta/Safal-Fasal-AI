// src/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export async function signUp(email, password, displayName) {
  const uc = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) await updateProfile(uc.user, { displayName });
  // optionally send verification
  await sendEmailVerification(uc.user);
  return uc.user;
}

export async function login(email, password) {
  const uc = await signInWithEmailAndPassword(auth, email, password);
  return uc.user;
}

export function logout() {
  return signOut(auth);
}

export function sendPasswordReset(email) {
  return sendPasswordResetEmail(auth, email);
}
// 🔹 Google login
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}
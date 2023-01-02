import React from 'react'

export default function SignOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('uid');
  // localStorage.removeItem('type');
  localStorage.setItem("type","NoLogin");
  window.location = "/";
}

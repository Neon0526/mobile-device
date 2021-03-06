import React from 'react';

export const STATUS = {

  toSignIn: 1,

  toSignOut: 2,

  toSignUp: 0,

};

export const AuthContext = React.createContext({

    status: STATUS.toSignIn

  })

/*

status及setStatus在provider會被覆蓋

status為toSignIn 已註冊，將要登入

status為toSignOut 已登入，將要登出  

status為toSignUp 未註冊，將要註冊  

*/
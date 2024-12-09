"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from "firebase/auth";



export function LoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate()

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home")
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });

}

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onLogin}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label  htmlFor="email">
              Email đăng nhập
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1 pt-3 pb-3">
            <Label  htmlFor="password">
              Mật khẩu
            </Label>
            <Input
              id="password"
              placeholder="password..."
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={onLogin} type = "submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Đăng nhập
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Chưa có tài khoản?
          </span>
        </div>
      </div>
      <Button onClick= {() => navigate('/sign-up')} variant="outline" type="button" disabled={isLoading}>
        Đăng ký
      </Button>
    </div>
  )
}
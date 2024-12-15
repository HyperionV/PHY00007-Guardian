import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {Link} from "react-router-dom"
import { Separator } from "@/components/ui/separator"

export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#4C9F4C] text-white h-20">
        <div className="container mx-auto px-1">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-10 pt-6">
              <div className="flex items-center gap-2 hover:cursor-pointer">
                <img src="../../public/icon.png" alt="Logo" className="h-12 w-12" />
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-bold">HỆ THỐNG ỨNG DỤNG IoT</span>
                  <span className="text-xl font-bold">HỖ TRỢ GIÁM SÁT VÀ BẢO VỆ RỪNG</span>
                </div>
              </div>
              <nav className="flex gap-7 ml-6">
                <Link to="/dashboard" className="text-white/90 text-lg font-semibold">DASHBOARD</Link>
                <Link to="/chatbot" className="text-white/90 text-lg font-semibold hover:text-white">CHATBOT</Link>
                <Link to="/profile" className="text-white/90 text-lg font-semibold hover:text-white">HỒ SƠ</Link>
                <Link to="/about" className="text-white/90 text-lg font-semibold hover:text-white">GIỚI THIỆU</Link>
              </nav>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <span className="text-base">Amanda</span>
              <Avatar className="h-10 w-10">
                <AvatarImage src="../../public/forest.jpg" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-[#f5f5f5]">
        {children}
      </main>
      <footer className="bg-[#4C9F4C] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-sm">
            <h3 className="font-semibold mb-2">HỆ THỐNG ỨNG DỤNG IOT</h3>
            <p>HỖ TRỢ GIÁM SÁT VÀ BẢO VỆ RỪNG</p>
            <p>Khoa Công Nghệ Thông Tin</p>
            <p>Trường Đại Học Khoa Học Tự Nhiên, Thành phố Hồ Chí Minh</p>
            <p>Liên hệ: 0123456789</p>
            <p>Email: abc@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


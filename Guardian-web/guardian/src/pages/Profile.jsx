'use client'

import { Layout } from '../components/layout'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function Profile() {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Profile Card */}
          <Card className="p-6 text-center">
            <div className="flex flex-col items-center">
              <Avatar className="w-48 h-48">
                <AvatarImage src="forest.jpg" alt="Amanda White" />
                <AvatarFallback>AW</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-2xl font-semibold">Amanda White</h2>
              <p className="text-muted-foreground">Admin</p>
            </div>
          </Card>

          {/* Profile Form */}
          <Card>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input
                      id="fullName"
                      placeholder="Nhập họ và tên"
                      defaultValue="Amanda White"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập email"
                      defaultValue="amanda@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      placeholder="Nhập số điện thoại"
                      defaultValue="0123456789"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label htmlFor="gender">Giới tính</Label>
                    <Input
                      id="gender"
                      placeholder="Nhập giới tính"
                      defaultValue="Nữ"
                    />
                  </div>

                  {/* Job */}
                  <div className="space-y-2">
                    <Label htmlFor="job">Công việc</Label>
                    <Input
                      id="job"
                      placeholder="Nhập công việc"
                      defaultValue="System Administrator"
                    />
                  </div>

                  {/* Birth Date */}
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Ngày sinh</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      placeholder="Chọn ngày sinh"
                      defaultValue="1990-01-01"
                    />
                  </div>

                  {/* Department */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="department">Tên đơn vị</Label>
                    <Input
                      id="department"
                      placeholder="Nhập tên đơn vị"
                      defaultValue="Khoa Công Nghệ Thông Tin"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}


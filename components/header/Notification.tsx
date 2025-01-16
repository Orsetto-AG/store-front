"use client";

import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

type NotificationType = 
  | "OFFER_RECEIVED"
  | "OFFER_ACCEPTED"
  | "PRODUCT_SOLD"
  | "PRICE_DROP"
  | "STOCK_ALERT";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  productImage: string;
  productId: string;
  price?: string;
};

export function Notification() {
    const { t } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "OFFER_RECEIVED",
      title: "Yeni Teklif Alındı",
      message: "iPhone 14 Pro Max için 25.000₺ teklif aldınız",
      time: "5 dakika önce",
      read: false,
      productImage: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=60",
      productId: "iphone-14-pro",
      price: "25.000₺"
    },
    {
      id: "2",
      type: "PRODUCT_SOLD",
      title: "Ürün Satıldı",
      message: "MacBook Pro M2 satışı tamamlandı",
      time: "1 saat önce",
      read: false,
      productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60",
      productId: "macbook-pro-m2",
      price: "45.000₺"
    },
    {
      id: "3",
      type: "PRICE_DROP",
      title: "Fiyat Düşüşü",
      message: "Takip ettiğiniz AirPods Pro'da fiyat düşüşü",
      time: "2 saat önce",
      read: false,
      productImage: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&auto=format&fit=crop&q=60",
      productId: "airpods-pro",
      price: "5.999₺"
    }
   ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const getNotificationIcon = (type: NotificationType) => {
    const baseClasses = "h-8 w-8 rounded-full flex items-center justify-center";
    switch (type) {
      case "OFFER_RECEIVED":
        return <div className={`${baseClasses} bg-blue-100 text-blue-600`}>💰</div>;
      case "PRODUCT_SOLD":
        return <div className={`${baseClasses} bg-green-100 text-green-600`}>✅</div>;
      case "PRICE_DROP":
        return <div className={`${baseClasses} bg-red-100 text-red-600`}>📉</div>;
      case "STOCK_ALERT":
        return <div className={`${baseClasses} bg-yellow-100 text-yellow-600`}>⚠️</div>;
      default:
        return <div className={`${baseClasses} bg-gray-100 text-gray-600`}>📢</div>;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative inline-flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors">
        <Bell className={cn(
          "h-5 w-5 ",
          unreadCount > 0 ?  " text-muted-foreground" : "text-gray-600 "
        )} />
        {unreadCount > 0 && (
          <span className="absolute -top-0 -right-0 h-4 w-4 rounded-full bg-red-500 text-[11px] font-medium text-white inline-flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
  align="end"
  className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px] xl:w-[550px] mt-2 ml-[25%] sm:ml-[26%] sm:max-w-[calc(100%-4rem)] px-4 sm:px-0"
>
        <div className="px-4 py-3 border-b">
        <div className="flex items-center justify-between sm:gap-2">
          <h3 className="font-semibold text-base truncate sm:text-left">
        {t('notification.notifications')}
      </h3>
            {unreadCount > 0 && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
              {unreadCount} {t('notification.unread')}
            </span>
            )}
          </div>
        </div>
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-muted-foreground">
            {t('notification.noNotifications')}
          </div>
        ) : (
          <div className="max-h-[450px] overflow-y-auto">
          {notifications.map((notification) => (
  <DropdownMenuItem
    key={notification.id}
    onClick={() => handleNotificationClick(notification.id)}
    className={cn(
      "px-3 py-3 cursor-pointer focus:bg-accent",
      notification.read ? "opacity-50" : "border-l-8 border-blue-500" 
    )}
  >
    <div className="flex gap-x-3">
      <div className="flex gap-3 flex-1 min-w-0">
        <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
          <Image
            src={notification.productImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {getNotificationIcon(notification.type)}
            <p className="text-sm font-medium leading-none truncate">
              {notification.title}
            </p>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {notification.message}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {notification.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  </DropdownMenuItem>
))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
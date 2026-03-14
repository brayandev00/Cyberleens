import React from 'react';
import { Bell, X, Trash2, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/contexts/NotificationContext';

const NotificationCenter: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">{unreadCount}</Badge>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b flex justify-between items-center font-bold">
          <span>Notifications</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={markAllAsRead}><CheckCheck size={14} /></Button>
            <Button variant="ghost" size="sm" onClick={clearAll}><Trash2 size={14} /></Button>
          </div>
        </div>
        <ScrollArea className="h-64">
          {notifications.map(n => (
            <div key={n.id} className={`p-4 border-b last:border-0 ${!n.read ? 'bg-muted/30' : ''}`}>
              <div className="flex justify-between items-start">
                <p className="font-semibold text-sm">{n.title}</p>
                <button onClick={() => removeNotification(n.id)}><X size={12} /></button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
            </div>
          ))}
          {notifications.length === 0 && <p className="text-center py-8 text-muted-foreground text-sm">No notifications</p>}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
export default NotificationCenter;

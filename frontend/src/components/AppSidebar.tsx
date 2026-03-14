import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Home, Scan, Settings, Activity, Sun, Moon, History, FileText, Bug, LogOut } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { getScanHistory } from '@/services/scanService';
import { supabase } from '@/integrations/supabase/client';

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const { data: scans = [] } = useQuery({
    queryKey: ['scanHistory'],
    queryFn: getScanHistory,
    refetchInterval: 5000,
  });

  const menuItems = [
    { title: 'Inicio', icon: Home, href: '/dashboard' },
    { title: 'Nuevo Escaneo', icon: Scan, href: '/new-scan' },
    { title: 'Todos los Escaneos', icon: History, href: '/all-scans' },
    { title: 'Reportes', icon: FileText, href: '/reports' },
    { title: 'Configuración', icon: Settings, href: '/settings' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <Sidebar className="border-r border-border bg-sidebar shadow-xl">
      <SidebarHeader className="border-b border-border bg-sidebar-accent">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
            <Bug className="text-white" size={28} />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              CyberLeens
            </span>
            <p className="text-sm text-gray-400">Security Insights</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Navegación</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                  <Link to={item.href} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Estadísticas</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 py-2 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estado</span>
                <span className="text-green-500 font-medium">En línea</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Escaneos</span>
                <span className="text-foreground font-medium">{scans.length}</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border p-4 space-y-2">
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} variant="outline" size="sm" className="w-full justify-start gap-2 text-foreground">
          {theme === 'light' ? <><Moon className="h-4 w-4" /><span>Modo Oscuro</span></> : <><Sun className="h-4 w-4" /><span>Modo Claro</span></>}
        </Button>
        <Button onClick={handleLogout} variant="destructive" size="sm" className="w-full justify-start gap-2">
          <LogOut className="h-4 w-4" />
          <span>Cerrar Sesión</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

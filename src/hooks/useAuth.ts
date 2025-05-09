import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { User } from '@supabase/supabase-js';

type Role = 'guest' | 'client' | 'employee' | 'admin';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>('guest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const u = data.session?.user ?? null;
      setUser(u);
      setRole((u?.user_metadata.role as Role) ?? 'guest');
      setLoading(false);
    };

    getSession();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      const u = s?.user ?? null;
      setUser(u);
      setRole((u?.user_metadata.role as Role) ?? 'guest');
      setLoading(false);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, role, loading };
};

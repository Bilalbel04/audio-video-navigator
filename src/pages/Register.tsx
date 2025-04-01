
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signUp(email, password, username);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 text-white border-gray-700">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-purple-400">Media Player</CardTitle>
          <CardDescription className="text-gray-400">
            Crea una cuenta para acceder al reproductor multimedia
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center border border-gray-700 rounded-md bg-gray-900">
                <div className="px-3 py-2 text-gray-400">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center border border-gray-700 rounded-md bg-gray-900">
                <div className="px-3 py-2 text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center border border-gray-700 rounded-md bg-gray-900">
                <div className="px-3 py-2 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-white"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚪</span> Cargando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" /> Registrarse
                </span>
              )}
            </Button>
            <p className="text-center text-gray-400 text-sm">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-purple-400 hover:underline">
                Iniciar Sesión
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;

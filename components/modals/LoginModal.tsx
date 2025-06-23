import { X } from "lucide-react";

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  onFormChange: (updates: Partial<LoginModalProps["form"]>) => void;
  error: string;
}

const LoginModal = ({
  show,
  onClose,
  onSwitchToSignup,
  onSubmit,
  form,
  onFormChange,
  error,
}: LoginModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-full overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Sign in
            </h2>
            <button
              onClick={onClose}
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => onFormChange({ email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => onFormChange({ password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={form.rememberMe}
                  onChange={(e) =>
                    onFormChange({ rememberMe: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded font-medium hover:bg-blue-800 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-4 md:mt-6 text-center">
            <p className="text-sm text-gray-600">
              New to NetworX?{" "}
              <button
                onClick={onSwitchToSignup}
                className="text-blue-700 hover:underline"
              >
                Join now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

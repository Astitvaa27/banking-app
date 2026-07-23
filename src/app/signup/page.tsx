export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-muted-foreground mb-6">
          Join VaultX today
        </p>

        <form className="space-y-4">
          <input
            placeholder="Full Name"
            className="w-full rounded-lg border p-3"
          />

          <input
            placeholder="Email"
            className="w-full rounded-lg border p-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border p-3"
          />

          <button className="w-full rounded-lg bg-primary py-3 text-primary-foreground">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
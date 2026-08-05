import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
} from "lucide-react";

function LoginIllustration() {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white">

      {/* Header */}
      <div>
        <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
          StoreMaster POS
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-tight">
          Run your business
          <br />
          with confidence.
        </h1>

        <p className="mt-4 max-w-md text-slate-300 leading-6">
          Manage inventory, sales, employees and reports from one modern
          dashboard.
        </p>
      </div>

      {/* Dashboard Preview */}
      <div className="space-y-4">

        {/* Revenue */}
        <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-slate-300">
                Today's Sales
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                KSh 142,580
              </h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-green-400">

                <TrendingUp size={16} />

                +18.4% Today

              </div>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">

              <TrendingUp
                size={22}
                className="text-blue-300"
              />

            </div>

          </div>

          {/* Mini Chart */}

          <div className="mt-5 flex h-16 items-end gap-2">

            <div className="h-8 w-4 rounded bg-blue-300"></div>
            <div className="h-10 w-4 rounded bg-blue-400"></div>
            <div className="h-7 w-4 rounded bg-blue-300"></div>
            <div className="h-12 w-4 rounded bg-blue-500"></div>
            <div className="h-14 w-4 rounded bg-blue-400"></div>
            <div className="h-10 w-4 rounded bg-blue-500"></div>
            <div className="h-16 w-4 rounded bg-blue-600"></div>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-3">

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">

            <Package
              className="mb-2 text-blue-300"
              size={20}
            />

            <h3 className="text-lg font-bold">
              1,240
            </h3>

            <p className="text-xs text-slate-300">
              Products
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">

            <ShoppingCart
              className="mb-2 text-blue-300"
              size={20}
            />

            <h3 className="text-lg font-bold">
              235
            </h3>

            <p className="text-xs text-slate-300">
              Orders
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">

            <Users
              className="mb-2 text-blue-300"
              size={20}
            />

            <h3 className="text-lg font-bold">
              18
            </h3>

            <p className="text-xs text-slate-300">
              Staff
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">

            <CreditCard
              className="mb-2 text-blue-300"
              size={20}
            />

            <h3 className="text-lg font-bold">
              842
            </h3>

            <p className="text-xs text-slate-300">
              Customers
            </p>

          </div>

        </div>

        {/* Transaction */}

        <div className="rounded-2xl border border-white/10 bg-white/10 p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-300">
                Recent Transaction
              </p>

              <h3 className="mt-1 font-medium">
                Jane Mwangi
              </h3>

            </div>

            <div className="text-right">

              <p className="font-bold text-green-400">
                KSh 8,450
              </p>

              <p className="text-xs text-slate-400">
                Successful
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginIllustration;
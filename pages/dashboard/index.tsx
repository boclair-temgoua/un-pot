import { PrivateComponent } from "@/components/util/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { usePathname } from "next/navigation";
import LayoutDashboard from "@/components/layout-dashboard";

const Dashboard = () => {
  const pathname = usePathname();
  const onSubmit: SubmitHandler<any> = (payload: any) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log("payload =======>", payload);
  };
  console.log("pathname =======>", pathname);
  return (
    <>
      <LayoutDashboard title={"Dashboard"}>

            <div className="flex flex-col flex-1 overflow-x-hidden">
                
                <main>
                    <div className="py-6">
                        <div className="px-4 mx-auto sm:px-6 md:px-8">
                            <div className="md:items-center md:flex">
                                <p className="text-base font-bold text-gray-900">Hey Mariana -</p>
                                <p className="mt-1 text-base font-medium text-gray-500 md:mt-0 md:ml-2">heres whats happening with your store today</p>
                            </div>
                        </div>

                        <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                            <div className="space-y-5 sm:space-y-6">
                                <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    <div className="bg-white border border-gray-200 rounded-xl">
                                        <div className="px-5 py-4">
                                            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Todays Sale</p>
                                            <div className="flex items-center justify-between mt-3">
                                                <p className="text-xl font-bold text-gray-900">$12,426</p>

                                                <span className="inline-flex items-center text-sm font-semibold text-green-500">
                                                    + 36%
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl">
                                        <div className="px-5 py-4">
                                            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Total Sales</p>
                                            <div className="flex items-center justify-between mt-3">
                                                <p className="text-xl font-bold text-gray-900">$2,38,485</p>

                                                <span className="inline-flex items-center text-sm font-semibold text-red-500">
                                                    - 14%
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl">
                                        <div className="px-5 py-4">
                                            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Total ORders</p>
                                            <div className="flex items-center justify-between mt-3">
                                                <p className="text-xl font-bold text-gray-900">84,382</p>

                                                <span className="inline-flex items-center text-sm font-semibold text-green-500">
                                                    + 36%
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl">
                                        <div className="px-5 py-4">
                                            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Total Customers</p>
                                            <div className="flex items-center justify-between mt-3">
                                                <p className="text-xl font-bold text-gray-900">33,493</p>

                                                <span className="inline-flex items-center text-sm font-semibold text-green-500">
                                                    + 36%
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-6">
                                    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-4">
                                        <div className="px-4 pt-5 sm:px-6">
                                            <div className="flex flex-wrap items-center justify-between">
                                                <p className="text-base font-bold text-gray-900 lg:order-1">Sales Report</p>

                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm lg:order-2 2xl:order-3 md:order-last hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                >
                                                    <svg className="w-4 h-4 mr-1 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    Export to CSV
                                                </button>

                                                <nav className="flex items-center justify-center mt-4 space-x-1 2xl:order-2 lg:order-3 md:mt-0 lg:mt-4 sm:space-x-2 2xl:mt-0">
                                                    <a href="#" title="" className="px-2 py-2 text-xs font-bold text-gray-900 transition-all border border-gray-900 rounded-lg sm:px-4 hover:bg-gray-100 dration-200"> 12 Months </a>

                                                    <a href="#" title="" className="px-2 py-2 text-xs font-bold text-gray-500 transition-all border border-transparent rounded-lg sm:px-4 hover:bg-gray-100 dration-200"> 6 Months </a>

                                                    <a href="#" title="" className="px-2 py-2 text-xs font-bold text-gray-500 transition-all border border-transparent rounded-lg sm:px-4 hover:bg-gray-100 dration-200"> 30 Days </a>

                                                    <a href="#" title="" className="px-2 py-2 text-xs font-bold text-gray-500 transition-all border border-transparent rounded-lg sm:px-4 hover:bg-gray-100 dration-200"> 7 Days </a>
                                                </nav>
                                            </div>

                                            <div id="chart4" className=""></div>
                                        </div>
                                    </div>

                                    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-2">
                                        <div className="px-4 py-5 sm:p-6">
                                            <div className="sm:flex sm:items-center sm:justify-between">
                                                <p className="text-base font-bold text-gray-900">Traffic Sources</p>

                                                <div className="mt-4 sm:mt-0">
                                                    <div>
                                                        <label className="sr-only"> Duration </label>
                                                        <select name="" id="" className="block w-full py-0 pl-0 pr-10 text-base border-none rounded-lg focus:outline-none focus:ring-0 sm:text-sm">
                                                            <option>Last 7 days</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 space-y-6">
                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-gray-900">Direct</p>
                                                        <p className="text-sm font-medium text-gray-900">1,43,382</p>
                                                    </div>
                                                    <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                                                        <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[60%]"></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-gray-900">Referral</p>
                                                        <p className="text-sm font-medium text-gray-900">87,974</p>
                                                    </div>
                                                    <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                                                        <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[50%]"></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-gray-900">Social Media</p>
                                                        <p className="text-sm font-medium text-gray-900">45,211</p>
                                                    </div>
                                                    <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                                                        <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[30%]"></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-gray-900">Twitter</p>
                                                        <p className="text-sm font-medium text-gray-900">21,893</p>
                                                    </div>
                                                    <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                                                        <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[15%]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-6">
                                    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-4">
                                        <div className="px-4 py-5 sm:p-6">
                                            <div className="sm:flex sm:items-start sm:justify-between">
                                                <div>
                                                    <p className="text-base font-bold text-gray-900">Transactions</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet, consectetur adipis.</p>
                                                </div>

                                                <div className="mt-4 sm:mt-0">
                                                    <a href="#" title="" className="inline-flex items-center text-xs font-semibold tracking-widest text-gray-500 uppercase hover:text-gray-900">
                                                        See all Transactions
                                                        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="divide-y divide-gray-200">
                                            <div className="grid grid-cols-3 py-4 gap-y-4 lg:gap-0 lg:grid-cols-6">
                                                <div className="col-span-2 px-4 lg:py-4 sm:px-6 lg:col-span-1">
                                                    <span className="text-xs font-medium text-green-900 bg-green-100 rounded-full inline-flex items-center px-2.5 py-1">
                                                        <svg className="-ml-1 mr-1.5 h-2.5 w-2.5 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                                                            <circle cx="4" cy="4" r="3"></circle>
                                                        </svg>
                                                        Completed
                                                    </span>
                                                </div>

                                                <div className="px-4 text-right lg:py-4 sm:px-6 lg:order-last">
                                                    <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                        </svg>
                                                    </button>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6 lg:col-span-2">
                                                    <p className="text-sm font-bold text-gray-900">Visa card **** 4831</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Card payment</p>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6">
                                                    <p className="text-sm font-bold text-gray-900">$182.94</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Jan 17, 2022</p>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6">
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Amazon</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 py-4 gap-y-4 lg:gap-0 lg:grid-cols-6">
                                                <div className="col-span-2 px-4 lg:py-4 sm:px-6 lg:col-span-1">
                                                    <span className="text-xs font-medium text-green-900 bg-green-100 rounded-full inline-flex items-center px-2.5 py-1">
                                                        <svg className="-ml-1 mr-1.5 h-2.5 w-2.5 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                                                            <circle cx="4" cy="4" r="3"></circle>
                                                        </svg>
                                                        Completed
                                                    </span>
                                                </div>

                                                <div className="px-4 text-right lg:py-4 sm:px-6 lg:order-last">
                                                    <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                        </svg>
                                                    </button>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6 lg:col-span-2">
                                                    <p className="text-sm font-bold text-gray-900">Mastercard **** 6442</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Card payment</p>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6">
                                                    <p className="text-sm font-bold text-gray-900">$99.00</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Jan 17, 2022</p>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6">
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Facebook</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 py-4 gap-y-4 lg:gap-0 lg:grid-cols-6">
                                                <div className="col-span-2 px-4 lg:py-4 sm:px-6 lg:col-span-1">
                                                    <span className="text-xs font-medium text-yellow-900 bg-yellow-100 rounded-full inline-flex items-center px-2.5 py-1">
                                                        <svg className="-ml-1 mr-1.5 h-2.5 w-2.5 text-yellow-400" fill="currentColor" viewBox="0 0 8 8">
                                                            <circle cx="4" cy="4" r="3"></circle>
                                                        </svg>
                                                        Pending
                                                    </span>
                                                </div>

                                                <div className="px-4 text-right lg:py-4 sm:px-6 lg:order-last">
                                                    <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                        </svg>
                                                    </button>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6 lg:col-span-2">
                                                    <p className="text-sm font-bold text-gray-900">Account ****882</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Bank payment</p>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6">
                                                    <p className="text-sm font-bold text-gray-900">$249.94</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Jan 17, 2022</p>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6">
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Netflix</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 py-4 gap-y-4 lg:gap-0 lg:grid-cols-6">
                                                <div className="col-span-2 px-4 lg:py-4 sm:px-6 lg:col-span-1">
                                                    <span className="text-xs font-medium text-red-900 bg-red-100 rounded-full inline-flex items-center px-2.5 py-1">
                                                        <svg className="-ml-1 mr-1.5 h-2.5 w-2.5 text-red-500" fill="currentColor" viewBox="0 0 8 8">
                                                            <circle cx="4" cy="4" r="3"></circle>
                                                        </svg>
                                                        Canceled
                                                    </span>
                                                </div>

                                                <div className="px-4 text-right lg:py-4 sm:px-6 lg:order-last">
                                                    <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                        </svg>
                                                    </button>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6 lg:col-span-2">
                                                    <p className="text-sm font-bold text-gray-900">Amex card **** 5666</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Card payment</p>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6">
                                                    <p className="text-sm font-bold text-gray-900">$199.24</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Jan 17, 2022</p>
                                                </div>

                                                <div className="px-4 lg:py-4 sm:px-6">
                                                    <p className="mt-1 text-sm font-medium text-gray-500">Amazon Prime</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-2">
                                        <div className="px-4 py-5 sm:p-6">
                                            <div>
                                                <p className="text-base font-bold text-gray-900">Recent Customers</p>
                                                <p className="mt-1 text-sm font-medium text-gray-500">Lorem ipsum dolor sit ametis.</p>
                                            </div>

                                            <div className="mt-8 space-y-6">
                                                <div className="flex items-center justify-between space-x-5">
                                                    <div className="flex items-center flex-1 min-w-0">
                                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male.png" alt="" />
                                                        <div className="flex-1 min-w-0 ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Jenny Wilson</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">w.lawson@example.com</p>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-gray-900">$11,234</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-500 truncate">Austin</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between space-x-5">
                                                    <div className="flex items-center flex-1 min-w-0">
                                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male-2.png" alt="" />
                                                        <div className="flex-1 min-w-0 ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Devon Lane</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500 truncate">dat.roberts@example.com</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex-shrink-0 text-right">
                                                        <p className="text-sm font-medium text-gray-900">$11,159</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-500 truncate">New York</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between space-x-5">
                                                    <div className="flex items-center flex-1 min-w-0">
                                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-female-2.png" alt="" />
                                                        <div className="flex-1 min-w-0 ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Jane Cooper</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500 truncate">jgraham@example.com</p>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-gray-900">$10,483</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-500">Toledo</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between space-x-5">
                                                    <div className="flex items-center flex-1 min-w-0">
                                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male-3.png" alt="" />
                                                        <div className="flex-1 min-w-0 ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Dianne Russell</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500 truncate">curtis.d@example.com</p>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-gray-900">$9,084</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-500">Naperville</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <a href="#" title="" className="inline-flex items-center text-xs font-semibold tracking-widest text-gray-500 uppercase hover:text-gray-900">
                                                    See all Customers
                                                    <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                
            </div>

      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Dashboard);

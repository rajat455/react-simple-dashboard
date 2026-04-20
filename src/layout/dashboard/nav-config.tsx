import { AnalyticsIcon, AppIcon, BankingIcon, BlogIcon, BookingIcon, CalendarIcon, ChatIcon, CourseIcon, EcommerceIcon, FileIcon, FileManagerIcon, InvoiceIcon, JobIcon, MailIcon, OrderIcon, PermissionIcon, ProductIcon, TourIcon, UserIcon } from "../../theme/icons";
import { NavigationList } from "../../theme/types";



export const navConfig: NavigationList[] = [
    {
        href: "/app",
        heading: "App",
        selected: true,
        icon: <AppIcon />
    },
    {
        href: "/ecommerce",
        heading: "Ecommerce",
        icon: <EcommerceIcon />
    },
    {
        href: "/analytics",
        heading: "Analytics",
        icon: <AnalyticsIcon />
    },
    {
        href: "/banking",
        heading: "Banking",
        icon: <BankingIcon />
    },
    {
        href: "/booking",
        heading: "Booking",
        icon: <BookingIcon />
    },
    {
        href: "/file",
        heading: "File",
        icon: <FileIcon />
    },
    {
        href: "/course",
        heading: "Course",
        icon: <CourseIcon />
    },
    {
        href: "/user",
        heading: "User",
        icon: <UserIcon />
    },
    {
        href: "/product",
        heading: "Product",
        icon: <ProductIcon />
    },
    {
        href: "/order",
        heading: "Order",
        icon: <OrderIcon />
    },
    {
        href: "/invoice",
        heading: "Invoice",
        icon: <InvoiceIcon />
    },
    {
        href: "/blog",
        heading: "Blog",
        icon: <BlogIcon />
    },
    {
        href: "/job",
        heading: "Job",
        icon: <JobIcon />
    },
    {
        href: "/tour",
        heading: "Tour",
        icon: <TourIcon />
    },
    {
        href: "/file_manager",
        heading: "File manager",
        icon: <FileManagerIcon />
    },
    {
        href: "/mail",
        heading: "Mail",
        icon: <MailIcon />
    },
    {
        href: "/chat",
        heading: "Chat",
        icon: <ChatIcon />
    },
    {
        href: "/calendar",
        heading: "Calendar",
        icon: <CalendarIcon />
    },
    {
        href: "/permission",
        heading: "Permission",
        icon: <PermissionIcon />
    },
]
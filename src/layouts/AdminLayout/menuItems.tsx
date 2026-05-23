import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { ROUTES } from "../../constants/routeNames";
import { hrRoutes } from "../../routes/routeConfig";

export const headerMenuItems: MenuProps["items"] = [
  { key: "data", label: <Link to={ROUTES.HOME}>ĐIỀU HÀNH SỐ LIỆU</Link> },
  { key: "corp", label: <Link to={ROUTES.HOME}>QUẢN TRỊ DOANH NGHIỆP</Link> },
  { key: "tech", label: <Link to={ROUTES.HOME}>VẬN HÀNH KỸ THUẬT</Link> },
  {
    key: "hr",
    label: (
      <Link to={ROUTES.HR.DASHBOARD}>QUẢN LÝ NHÂN SỰ, CHÍNH SÁCH THU NHẬP</Link>
    ),
  },
  { key: "train", label: <Link to={ROUTES.HOME}>QUẢN LÝ ĐÀO TẠO</Link> },
];

function buildMenuItems(routes: any[], basePath = ""): MenuProps["items"] {
  const items: any[] = [];

  for (const route of routes) {
    if (!route.handle?.showInMenu) continue;

    const currentPath = `${basePath}/${route.path}`.replace(/\/+/g, "/");
    const hasVisibleChildren =
      route.children && route.children.some((c: any) => c.handle?.showInMenu);

    const item: any = {
      key: currentPath,
      icon: route.handle.icon,
      label: hasVisibleChildren ? (
        route.handle.title
      ) : (
        <Link to={currentPath}>{route.handle.title}</Link>
      ),
    };

    if (hasVisibleChildren) {
      item.children = buildMenuItems(route.children, currentPath);
    }

    items.push(item);
  }

  return items;
}

export const siderMenuItems = buildMenuItems(hrRoutes, "/hr");

import type { NavGroupProps, NavItemProps } from "../../utils/interfaces";
import NavItem from "../NavItem/NavItem";
import style from "./NavGroup.module.scss"

export default function NavGroup({ title, links }: NavGroupProps) {
  return (
    <div className={style.group}>
      <p className={style.groupTitle}>{title}</p>

      <div className={style.groupLinks}>
        {links.map((item: NavItemProps, i: number) => (
          <NavItem key={i} icon={item.icon} title={item.title} link={item.link} />
        ))}
      </div>
    </div>
  )
}


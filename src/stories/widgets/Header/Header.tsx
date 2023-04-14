import React from "react"

import { HeaderStyles as s } from "./Header.styles"

import { ThemeToggler } from "../../components/ThemeToggler/ThemeToggler"
import { BrandLogo } from "../../components/BrandLogo/BrandLogo"
import { BurgerIcon } from "../../components/BurgerIcon/BurgerIcon"
import { Button } from "../../components/Button/Button"
import { Link, navigate } from "gatsby"

type NavItem = {
  id: string
  navItemType: "Link"
  href: string
  text: string
}

type NavItemGroup = {
  id: string
  navItemType: "Group"
  name: string
  // navItems: NavItemGroupNavItem[]
}

export interface HeaderProps {
  navItems: NavItem[] | NavItemGroup[]
  cta: {
    id: string
    href: string
    text: string
  }
}

export const Header = ({ navItems, cta }: HeaderProps) => {
  const [isOpen, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
    }
  }, [isOpen])

  const handleRedirect = (to: string) => {
    setOpen(false)
    navigate(to)
  }

  return (
    <s.Container>
      <s.Header>
        <Link to="/">
          <BrandLogo />
        </Link>
        <s.DesktopNav>
          <ul>
            {navItems?.map((navItem) => (
              <li key={navItem.id}>
                {navItem.navItemType === "Group" ? (
                  // <NavItemGroup
                  //   name={navItem.name}
                  //   navItems={navItem.navItems}
                  // />
                  <></>
                ) : (
                  <a onClick={() => handleRedirect(navItem.href)}>
                    {navItem.text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </s.DesktopNav>
        {cta && (
          <Button
            href={cta.href}
            text={cta.text}
            idPrefix={"header"}
            id={"cta"}
            primary={!isOpen}
            size="small"
          />
        )}
        <ThemeToggler />
        <BurgerIcon onClick={() => setOpen(!isOpen)} open={isOpen} />
      </s.Header>
      <s.MobileNav
        initial={{ right: "-100%" }}
        animate={{ right: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.5 }}
      >
        <ul>
          {navItems?.map((navItem) => (
            <li key={navItem.id}>
              {navItem.navItemType === "Group" ? (
                // TODO Migrate "NavItemGroup"
                // <NavItemGroup
                //   name={navItem.name}
                //   navItems={navItem.navItems}
                // />
                <></>
              ) : (
                <a onClick={() => handleRedirect(navItem.href)}>
                  {navItem.text}
                </a>
              )}
            </li>
          ))}
        </ul>
      </s.MobileNav>
    </s.Container>
  )
}

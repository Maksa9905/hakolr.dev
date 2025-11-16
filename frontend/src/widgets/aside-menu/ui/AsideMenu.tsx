import { useUnit } from 'effector-react'
import { $asideMenuOpened, toggleAsideMenu } from '../model/model'
import S from './AsideMenu.styled'
import { MenuIcon } from '@/shared/icons'

const AsideMenu = () => {
  const isOpen = useUnit($asideMenuOpened)
  const toggleMenu = useUnit(toggleAsideMenu)

  return (
    <S.Container
      $isOpen={isOpen}
      isOpen={isOpen}
      onClose={toggleMenu}
    >
      <S.Navgation onClick={toggleMenu} />
      {!isOpen && (
        <S.ToggleButton onClick={toggleMenu}>
          <MenuIcon />
        </S.ToggleButton>
      )}
    </S.Container>
  )
}

export default AsideMenu

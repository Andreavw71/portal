import GovBar from './GovBar';
import MainHeaderBar from './MainHeaderBar';
import SecondaryNav from './SecondaryNav';

export default function Header({ user }) {
  return (
    <header className="portal-header" role="banner">
      <GovBar />
      <MainHeaderBar user={user} />
      <SecondaryNav />
    </header>
  );
}

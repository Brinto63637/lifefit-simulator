import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import CityComparison from "../components/CityComparison";

export default function Home() {
  const [profile, setProfile] = useState(null);

  return (
    <div className="page-container">
      <div className="content-card">

        <h1>🏠 LifeFit Simulator</h1>

        {}
        <h3> Enter Your Details</h3>
        <ProfileForm onSubmit={setProfile} />

        {}
        {profile && (
          <>
            <h3 style={{ marginTop: "30px" }}>
               View City Analysis
            </h3>

            <CityComparison profile={profile} />
          </>
        )}

      </div>
    </div>
  );
}

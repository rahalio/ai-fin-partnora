import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./app/AppShell";
import { LoginPage } from "./pages/LoginPage";
import { PipelinePage } from "./pages/PipelinePage";
import { DealsPage } from "./pages/DealsPage";
import { GatesPage } from "./pages/GatesPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ChannelsPage } from "./pages/ChannelsPage";
import { ConflictsPage } from "./pages/ConflictsPage";
import { EconomicsPage } from "./pages/EconomicsPage";
import { AuditsPage } from "./pages/AuditsPage";
import { PartnersPage } from "./pages/PartnersPage";
import { OwnershipPage } from "./pages/OwnershipPage";
import { DataPurposePage } from "./pages/DataPurposePage";
import { PilotsPage } from "./pages/PilotsPage";
import { MaReassessmentPage } from "./pages/MaReassessmentPage";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/pipeline" replace />} />
        <Route path="/pipeline" element={<PipelinePage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/gates" element={<GatesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/channels" element={<ChannelsPage />} />
        <Route path="/conflicts" element={<ConflictsPage />} />
        <Route path="/economics" element={<EconomicsPage />} />
        <Route path="/audits" element={<AuditsPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/ownership" element={<OwnershipPage />} />
        <Route path="/datapurpose" element={<DataPurposePage />} />
        <Route path="/pilots" element={<PilotsPage />} />
        <Route path="/ma-reassessment" element={<MaReassessmentPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/pipeline" replace />} />
    </Routes>
  );
}

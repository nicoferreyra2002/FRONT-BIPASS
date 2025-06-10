
import MainLayout from "../mainLayout/MainLayout";
import Portada from "./Portada";
import TiposDeEntradas from "./TiposDeEntradas";
import GrillaEventos from "./GrillaEventos";

const Dashboard = () => {
    return (
        <MainLayout>
            <Portada />
            <TiposDeEntradas />
            <GrillaEventos />
        </MainLayout>
    );
};

export default Dashboard;

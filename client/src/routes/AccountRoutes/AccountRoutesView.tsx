import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {ROUTES} from "../../config/routes";
import {AccountScreen} from "./Account/AccountScreen";
import {TourCardDetail} from "../HomeRoutes/TourCardDetail";

const AccountRoutesView: React.FC = () => {
    return (
        <Switch>
            <Route path={ROUTES.accountDetails} component={TourCardDetail}/>
            <Route path={ROUTES.account} component={AccountScreen}/>
            <Redirect to={ROUTES.account}/>
        </Switch>
    );
};

export default AccountRoutesView;

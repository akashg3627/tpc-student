import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import Loading from "../Extra/Loading";
import { fetchNotifications } from "../../Redux/Reducer/Notifications/notificationsReducer";
import "./Notifications.css";
import Empty from "../Extra/Empty";
// import Notification from "./Notification";
import Accordion from "@material-ui/core/Accordion";
import moment from "moment";
import Avatar from '@material-ui/core/Avatar';
import { AccordionDetails, AccordionSummary, Chip, Grid, Typography } from "@material-ui/core";

function Notifications() {
	const dispatch = useDispatch();
	const [expanded, setExpand] = useState('');

	useEffect(() => {
		dispatch(fetchNotifications());
	}, [dispatch]);
	const handleClick = (id) => {
		setExpand(id);
		setTimeout(() => {
			setExpand('');
		}, 5000)
	}

	const notificationsReducer = useSelector((state) => state.notifications);
	const notifications = notificationsReducer.notifications

	if (notificationsReducer.isLoading) return <Loading />;
	else {
		return (
			<div className="container notifications">
				{notifications &&
					notifications.length > 0 &&
					notifications
						.map((n) => {
							const subArray = n.subject.split(' / ');
							// const subArray = ["Amazon", "rejected"]

							return (
								<Accordion square expanded={expanded === n._id} onClick={() => handleClick(n._id)}>
									<AccordionSummary>
										<Grid container>
											<Grid item xs={3} md={1}>
												<Avatar style={{ backgroundColor: "blue", width: "3.5rem", height: "3.5rem" }} className="col-2">{(n.companyName.toUpperCase())?.[0]}</Avatar>
											</Grid>
											<Grid item container xs={6} md={9}>
												<Grid item xs={12}>
													<strong style={{ fontSize: "larger" }}>{n.companyName.toUpperCase()}{' '}</strong>{' '}
													{subArray.length > 1 ?
														<Chip label={subArray[1]} variant="outlined" />
														: null}
												</Grid>
												<Grid item xs={12}>
													{subArray[0]}
												</Grid>
											</Grid>
											<Grid id="date" item xs={3} md={2}>
												{moment(n.date).format("D MMMM, YYYY") + " at " + moment(n.date).format("h:mm a")}
											</Grid>
										</Grid>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>{n.text}</Typography>
									</AccordionDetails>
								</Accordion>
							);
						})
						.reverse()}
				{notifications && notifications.length === 0 && <Empty text="NO NOTIFICATIONS" />}
			</div>
		);
	}
}

export default Notifications;

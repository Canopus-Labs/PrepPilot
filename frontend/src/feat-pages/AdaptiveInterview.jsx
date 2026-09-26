import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AdaptiveInterview = () => {

const { user } = useContext(UserContext);

const [session, setSession] = useState(null);

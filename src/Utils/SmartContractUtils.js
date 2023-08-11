import Web3 from 'web3';
// import { doctorABI } from '../abis/doctor'
import { hospitalABI } from '../abis/hospital'
// import { diagABI } from '../abis/diagnostic'
// import { clinicABI } from '../abis/clinic'
console.log(hospitalABI);
const web3 = new Web3(process.env.REACT_APP_BLOCKCHAIN_PROVIDER_URL);
console.log(process.env.REACT_APP_BLOCKCHAIN_PROVIDER_URL);
const doctorAddress = process.env.REACT_APP_DOCTOR_CONTRACT_ADDRESS;
console.log(doctorAddress);
const hospitalAddress = process.env.REACT_APP_HOSPITAL_CONTRACT_ADDRESS;
console.log(hospitalAddress);
const clinicAddress = process.env.REACT_APP_CLINIC_CONTRACT_ADDRESS
console.log(clinicAddress);
const diagAddress = process.env.REACT_APP_DIAGNOSTIC_CONTRACT_ADDRESS;
console.log(diagAddress);
const doctorContract = new web3.eth.Contract(hospitalABI, "0x553E7bb3C0411A88A0CfFcB1D07Df86a0118AaC2");
// const doctorContract = new web3.eth.Contract(hospitalABI, doctorAddress);
const hospitalContract = new web3.eth.Contract(hospitalABI, "0x553E7bb3C0411A88A0CfFcB1D07Df86a0118AaC2");
// const hospitalContract = new web3.eth.Contract(hospitalABI, hospitalAddress);
const diagContract = new web3.eth.Contract(hospitalABI, "0x553E7bb3C0411A88A0CfFcB1D07Df86a0118AaC2");
// const diagContract = new web3.eth.Contract(hospitalABI, diagAddress);
const clinicContract = new web3.eth.Contract(hospitalABI, "0x553E7bb3C0411A88A0CfFcB1D07Df86a0118AaC2");
// const clinicContract = new web3.eth.Contract(hospitalABI, clinicAddress);
// let doctorContract, diagContract, hospitalContract, clinicContract;

const registerDoctor = async (data, accountAddress) => {
    try {
        const result = await doctorContract.methods.registerDoctor(
            data.abha,
            data.aadhar,
            data.name,
            data.age,
            data.grnumber,
            data.phone,
            data.email,
            data.specialisation,
        ).send({
            from: accountAddress,
            gas: 3000000
        })
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
        const errObject = {
            message: "Failed to register, Please check your balance or try another account"
        }
        return errObject;
    }
}

const register_patient = async (data, accountAddress) => {
    try {
        console.log("registering");
        const result = await doctorContract.methods.register_patient(
            data.name,
            data.age,
            data.abha,
            data.aadhar,
            data.gender,
            data.phone,
            data.email
        ).send({ from: accountAddress, gas: 3000000 })
        console.log(result);
        console.log("registered");
        return result;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to register, Please check your balance or try another account"
        }
    }
}

const deleteDocument = async (accountAddress, cid) => {
    try {
        const result = await doctorContract.methods.deleteRecord(cid).send({
            from: accountAddress,
            gas: 3000000
        })
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to delete your document, Please check your balance or try again later",
        }
        return errObject;
    }
}


const getDoctorOwnProfile = async (accountAddress) => {
    try {
        const result = await doctorContract.methods.getDocOwnProfile().call({
            from: accountAddress
        })
        const userData = result;
        console.log(userData);
        return userData
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch your profile, Please reload the page or try again later",
        }
    }
}


const getPatientsForADoctor = async (accountAddress) => {
    try {
        const result = await doctorContract.methods.getPatients().call({
            from: accountAddress,
            gas: 3000000
        })
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch your patients, Please reload the page or try again later",
        }
        return errObject;
    }
}

const getAllDoctorsForAPatient = async (accountAddress) => {
    try {
        const res = await doctorContract.methods.getDoctorsForUser().call({
            from: accountAddress
        });
        const grantedDoctors = res;
        console.log(grantedDoctors);
        return grantedDoctors;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch your doctors, Please reload the page or try again later",
        }
        return errObject;
    }
}

const getPatientOwnProfile = async (accountAddress) => {
    try {
        const result = await doctorContract.methods.getPatientOwnProfile().call({
            from: accountAddress
        })
        const userData = result;
        console.log(userData);
        return userData;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch your profile, Please reload the page or try again later",
        }
        return errObject;
    }
}

const grantAccessToDoctor = async (docAddress, accountAddress) => {
    try {
        const res = await doctorContract.methods.grantAccess(docAddress).send({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to grant access, Please check your balance or try another account",
        }
        return errObject;
    }

}

const searchDoctorByAddress = async (enteredAddress, accountAddress) => {
    try {
        const res = await doctorContract.methods.getDocOwnProfile(enteredAddress).call({
            from: accountAddress
        });
        const doctorProfile = res;
        console.log(doctorProfile);
        return doctorProfile;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch doctor profile, Please reload the page or try again later",
        }
        return errObject;
    }
}

const searchDoctorByName = async (accountAddress) => {
    try {
        const res = await doctorContract.methods.getAllDoctors().call({
            from: accountAddress
        })
        const doctorProfile = res;
        console.log(doctorProfile);
        return doctorProfile;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch doctor profiles, Please reload the page or try again later",
        }
        return errObject;
    }
}

const uploadRecordByUser = async (data, accountAddress) => {
    try {
        const res = await doctorContract.methods.addRecordByUser(
            data.org, String(data.date), String(data.doctorname), String(data.documentName), String(data.path), String(data.cid), accountAddress, String(data.docType)).send({
                from: accountAddress,
                gas: 3000000
            });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to upload your document, Please check your balance or try again later",
        }
        return errObject;
    }
}


const revokeDoctorsAccess = async (docAddress, accountAddress) => {
    try {
        const res = await doctorContract.methods.revokeAccess(docAddress).send({
            from: accountAddress,
            gas: 3000000
        })
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to revoke access, Please check your balance or try again later",
        }
        return errObject;
    }
}

const getRecordsOfUser = async (patientAddress, accountAddress) => {
    try {
        const res = await doctorContract.methods.getHealthRecords(patientAddress).call({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch the documents, Please reload the page or try again later",
        }
        return errObject;
    }
}

// -------------------------------------------------- //

const removeDoctorFromHospital = async (docAddress, accountAddress) => {
    try {
        const res = await hospitalContract.methods.removeDoctor(docAddress).send({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to remove doctor, Please check your balance or try again later",
        }
        return errObject;
    }
}

const addDoctorToHospital = async (docAddress, accountAddress) => {
    try {
        const res = await hospitalContract.methods.addDoctorTOHospital(docAddress).send({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to add doctor, Please check your balance or try again later",
        }
        return errObject;
    }
}

const getDoctorsOfHospital = async (accountAddress) => {
    try {
        const res = await hospitalContract.methods.getAllDoctorsForHospital().call({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch doctors, Please reload the page or try again later",
        }
        return errObject;
    }
}

// public variable
const getHospitalProfile = async (accountAddress) => {
    try {
        const res = await hospitalContract.methods.hospitals(accountAddress).call({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch hospital profile, Please reload the page or try again later",
        }
        return errObject;
    }
}

const revokeAllAccessOfDoctor = async (docAddress, accountAddress) => {
    try {
        const res = await hospitalContract.methods.revokeAllAccess(docAddress).send({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed revoke access, Please check your balance or try again later",
        }
        return errObject;
    }
}

const registerHospital = async (data, accountAddress) => {
    try {
        const res = await hospitalContract.methods.registerHospital(
            data.name,
            data.email,
            data.phone,
            data.license
        ).send({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to register hospital, Please check your balance or try again later",
        }
        return errObject;
    }
}


const registerDiagnostic = async (data, accountAddress) => {
    try {
        const res = await diagContract.methods.registerDiagnostic(
            data.name,
            data.email,
            data.phone,
            data.license
        ).send({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to register diagnostic, Please check your balance or try again later",
        }
        return errObject;
    }
}

const getDiagnosticOfPatient = async (accountAddress) => {
    try {
        const res = await diagContract.methods.getDiagnosticOfPatient(accountAddress).call({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch diagnostic profiles, Please reload the page or try again later",
        }
        return errObject;
    }
}

const getHealthRecordsOfPatient = async (accountAddress) => {
    try {
        const res = await diagContract.methods.getHealthRecordsDiagnostic(accountAddress).call({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch health records, Please reload the page or try again later",
        }
        return errObject;
    }
}

const getAllDiagnostics = async (accountAddress) => {
    try {
        const res = await diagContract.methods.getAllDiagnostics().call({
            from: accountAddress,
            gas: 3000000
        });
        // returns (array of objects, array of addresses)
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch diagnostics, Please reload the page or try again later",
        }
        return errObject;
    }
}

// public variable
// important issue review with priority
const getDiagProfile = async (address, accountAddress) => {
    try {
        const res = await diagContract.methods.DiagnosticIndex(address).call({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error)
        const errObject = {
            message: "Failed to fetch diagnostic profile, Please reload the page or try again later",
        }
        return errObject;
    }
}

const getPatientsOfDiagnostic = async (accountAddress) => {
    try {
        const res = await diagContract.methods.getPatientsForDiagnostic().call({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch patients, Please reload the page or try again later",
        }
        return errObject;
    }
}

const grantAccessToDiagnostic = async (address, accountAddress) => {
    try {
        const res = await diagContract.methods.grantAccessToDiagnostic(address).send({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to grant access, Please check your balance or try again later",
        }
        return errObject;
    }
}

const revokeAccessOfDiagnostic = async (address, accountAddress) => {
    try {
        const res = await diagContract.methods.revokeAccessDiagnostic(address).send({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to revoke access, Please check your balance and try again later",
        }
        return errObject;
    }
}

const getDiagnosticForPatient = async (accountAddress) => {
    try {
        const res = await diagContract.methods.getDiagnosticsForUser().call({
            from: accountAddress,
            gas: 3000000
        });
        // returns array and count of diagnostics
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch diagnostics, Please reload the page or try again later",
        }
        return errObject;
    }
}

const uploadRecordsByDiagnostic = async (data, accountAddress, patientAddress) => {
    try {
        const res = await diagContract.methods.uploadRecordsDiagnostic(
            patientAddress,
            data.org, String(data.date), String(data.doctorname), String(data.documentName), String(data.path), String(data.cid), String(data.docType)).send({
                from: accountAddress,
                gas: 3000000
            });
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to upload records, Please check your balance or try again later",
        }
        return errObject;
    }
}

// CLinic Functions 
// Begin

const registerClinic = async (data, accountAddress) => {
    try {
        const res = await clinicContract.methods.registerClinic(
            data.name,
            data.phone,
            data.email,
            data.location
        ).send({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to register clinic, Please check your balance or try again later",
        }
        return errObject;
    }
}

const enrollInClinicForDoctor = async (cliAddress, accountAddress) => {
    try {
        const res = await clinicContract.methods.enrollInClinic(cliAddress).send({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to enroll in clinic, Please check your balance or try again later",
        }
        return errObject;
    }
}

const getDoctorsOfClinic = async (accountAddress) => {
    try {
        const res = await clinicContract.methods.getAllDoctorsForClinic().call({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch doctor profiles, Please reload the page or try again later",
        }
        return errObject;
    }
}


const getClinicProfile = async (cliAddress, accountAddress) => {
    try {
        const res = await clinicContract.methods.ClinicIndex(cliAddress).call({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to fetch clinic profile, Please reload the page or try again later",
        }
        return errObject;
    }
}


export {
    registerDoctor,
    register_patient,
    getDoctorOwnProfile,
    getAllDoctorsForAPatient,
    getPatientsForADoctor,
    getPatientOwnProfile,
    searchDoctorByAddress,
    searchDoctorByName,
    grantAccessToDoctor, revokeDoctorsAccess, getRecordsOfUser, uploadRecordByUser,
    removeDoctorFromHospital, addDoctorToHospital, getDoctorsOfHospital, getHospitalProfile, revokeAllAccessOfDoctor, registerHospital,
    registerDiagnostic, getDiagnosticOfPatient, getHealthRecordsOfPatient, getAllDiagnostics, getDiagProfile, getPatientsOfDiagnostic, grantAccessToDiagnostic, revokeAccessOfDiagnostic, getDiagnosticForPatient, uploadRecordsByDiagnostic, deleteDocument,
    registerClinic, enrollInClinicForDoctor, getDoctorsOfClinic,
    getClinicProfile
}





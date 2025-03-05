import Chart from "react-apexcharts";
import moment from "moment";

const ReportModal = ({ isOpen, onClose, reportData = {} }) => {
  if (!isOpen) return null; // Hide modal if not open

  const chartOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: {
      categories: ["Total Forms", "Pending Forms", "Processed Forms", "Rejected Forms"],
      labels: { style: { colors: "#000000", fontSize: "12px" } },
    },
    yaxis: { 
      labels: { style: { colors: "#000000", fontSize: "12px" } },
      title: {
        text: "Total Nunmers of Form",
        style: {
          color: '#008FFB',
        }
      },
    },
    grid: { show: true },
  };

  const series = [{ name: "Leads", data: [reportData.totalForms, reportData.pendingForms, reportData.processedForms, reportData.rejectedForms] }];

  const chartLineOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: {
      categories: reportData.labels,
      labels: { style: { colors: "#000000", fontSize: "12px" } },
    },
    yaxis: { labels: { style: { colors: "#000000", fontSize: "12px" } } },
    grid: { show: true },
  };

  const lineSeries = [{ name: "Leads", data: reportData.data }];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-[700px]">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h5 className="text-xl sm:text-2xl font-bold text-black">
            Revenue Department {reportData.state}
          </h5>
          <a className="text-black bg-white text-lg cursor-pointer" onClick={onClose}>✖</a>
        </div>

        {/* Title */}
        <h5 className="text-lg sm:text-xl text-black text-center my-2">
          {reportData.formTitle} Dashboard {reportData.district}
        </h5>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <dl className="flex items-center">
            <dt className="text-black font-semibold mr-1">Date:</dt>
            <dd className="text-gray-800 text-sm font-semibold">
              {moment(reportData.createdAt).format("DD-MM-YYYY")}
            </dd>
          </dl>
          <dl className="flex items-center sm:justify-end">
            <dt className="text-black font-semibold mr-1">Time:</dt>
            <dd className="text-gray-800 text-sm font-semibold">
              {moment(reportData.createdAt).format("hh:mm:ss A")}
            </dd>
          </dl>
        </div>

        {/* Bar Chart */}
        <div className="mt-4">
          <Chart options={chartOptions} series={series} type="bar" width="100%" height={250} />
        </div>

        {/* Line Chart */}
        <h5 className="text-lg sm:text-xl text-black text-center my-2">
          Monthly Overview across {reportData.district}
        </h5>
        <div>
          <Chart options={chartLineOptions} series={lineSeries} type="line" width="100%" height={200} />
        </div>
      </div>
    </div>
  );
};

export default ReportModal;

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Graph({crashed, chartData}){

    return (
        <>
            {/* Chart */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 mb-8">
            <h3 className="text-2xl font-bold mb-4">Live Price Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                    dataKey="time" 
                    stroke="#888" 
                    label={{ value: 'Time (seconds)', position: 'insideBottom', offset: -5, fill: '#888' }}
                />
                <YAxis 
                    stroke="#888" 
                    label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft', fill: '#888' }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #6b46c1' }}
                    formatter={(value) => `${value.toLocaleString()}`}
                />
                <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={crashed ? "#ef4444" : "#10b981"} 
                    strokeWidth={2}
                    dot={false}
                />
                </LineChart>
            </ResponsiveContainer>
            </div>
        </>
        
    )
}

export default Graph
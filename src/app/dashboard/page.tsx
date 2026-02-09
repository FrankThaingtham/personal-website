// app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
export const runtime = 'edge';

// Simple password protection via query param
function checkAuth(searchParams: { key?: string }) {
  const expectedPassword = process.env.DASHBOARD_PASSWORD;
  
  if (!expectedPassword) {
    throw new Error('DASHBOARD_PASSWORD not set in environment variables');
  }
  
  if (searchParams.key !== expectedPassword) {
    return false;
  }
  
  return true;
}

// Fetch dashboard data
async function getDashboardData() {
  try {
    // 1. Get total visitors (unique visitor_ids in last 7 days)
    const { count: totalVisitors } = await supabaseAdmin
      .from('events')
      .select('visitor_id', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    // 2. Get funnel counts
    const { data: funnelData } = await supabaseAdmin
      .from('events')
      .select('event_name, visitor_id')
      .in('event_name', ['onboarding_completed', 'resume_clicked', 'contact_clicked']);

    // Calculate unique visitors per event
    const onboardingCompleted = new Set(
      funnelData?.filter(e => e.event_name === 'onboarding_completed').map(e => e.visitor_id) || []
    ).size;

    const resumeClicked = new Set(
      funnelData?.filter(e => e.event_name === 'resume_clicked').map(e => e.visitor_id) || []
    ).size;

    const contactClicked = new Set(
      funnelData?.filter(e => e.event_name === 'contact_clicked').map(e => e.visitor_id) || []
    ).size;

    // 3. Get funnel by role
    const { data: preferences } = await supabaseAdmin
      .from('preferences')
      .select('visitor_id, role');

    const { data: allEvents } = await supabaseAdmin
      .from('events')
      .select('visitor_id, event_name')
      .in('event_name', ['onboarding_completed', 'resume_clicked', 'contact_clicked']);

    // Build role breakdown
    const roleBreakdown: Record<string, { onboarding: number; resume: number; contact: number }> = {};
    
    preferences?.forEach(pref => {
      if (!roleBreakdown[pref.role]) {
        roleBreakdown[pref.role] = { onboarding: 0, resume: 0, contact: 0 };
      }
      
      const visitorEvents = allEvents?.filter(e => e.visitor_id === pref.visitor_id) || [];
      
      if (visitorEvents.some(e => e.event_name === 'onboarding_completed')) {
        roleBreakdown[pref.role].onboarding++;
      }
      if (visitorEvents.some(e => e.event_name === 'resume_clicked')) {
        roleBreakdown[pref.role].resume++;
      }
      if (visitorEvents.some(e => e.event_name === 'contact_clicked')) {
        roleBreakdown[pref.role].contact++;
      }
    });

    // 4. Get recent activity (events per day)
    const { data: recentActivity } = await supabaseAdmin
      .from('events')
      .select('created_at, event_name')
      .gte('created_at', new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false });

    // Group by date
    const activityByDate: Record<string, Record<string, number>> = {};
    recentActivity?.forEach(event => {
      const date = new Date(event.created_at).toISOString().split('T')[0];
      if (!activityByDate[date]) {
        activityByDate[date] = {};
      }
      activityByDate[date][event.event_name] = (activityByDate[date][event.event_name] || 0) + 1;
    });

    return {
      totalVisitors: totalVisitors || 0,
      funnel: {
        onboarding: onboardingCompleted,
        resume: resumeClicked,
        contact: contactClicked,
      },
      roleBreakdown,
      activityByDate,
    };
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    throw error;
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  // Await searchParams (Next.js 15 requirement)
  const params = await searchParams;
  
  // Check authentication
  if (!checkAuth(params)) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, marginBottom: 8 }}>🔒 Access Denied</h1>
          <p style={{ color: '#666' }}>Invalid or missing password</p>
          <p style={{ fontSize: 14, color: '#999', marginTop: 16 }}>
            Use: /dashboard?key=YOUR_PASSWORD
          </p>
        </div>
      </div>
    );
  }

  // Fetch data
  const data = await getDashboardData();

  // Calculate conversion rates
  const onboardingToResume = data.funnel.onboarding > 0 
    ? ((data.funnel.resume / data.funnel.onboarding) * 100).toFixed(1)
    : '0';
  
  const resumeToContact = data.funnel.resume > 0
    ? ((data.funnel.contact / data.funnel.resume) * 100).toFixed(1)
    : '0';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ 
            fontSize: 36, 
            fontWeight: 700, 
            marginBottom: 8,
            color: '#111827',
          }}>
            Analytics Dashboard
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: 18,
            fontWeight: 500,
          }}>
            Last 7 days · Updated in real-time
          </p>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          marginBottom: 48,
        }}>
          <KPICard
            title="Total Visitors"
            value={data.totalVisitors}
            description="Unique visitors (7 days)"
            color="#3b82f6"
          />
          <KPICard
            title="Onboarding Complete"
            value={data.funnel.onboarding}
            description="Completed onboarding flow"
            color="#10b981"
          />
          <KPICard
            title="Resume Clicks"
            value={data.funnel.resume}
            description="Viewed resume"
            color="#f59e0b"
          />
          <KPICard
            title="Contact Clicks"
            value={data.funnel.contact}
            description="Clicked contact"
            color="#8b5cf6"
          />
        </div>

        {/* Funnel Table */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 32,
          marginBottom: 32,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          <h2 style={{ 
            fontSize: 24, 
            fontWeight: 700, 
            marginBottom: 24,
            color: '#111827',
          }}>
            Conversion Funnel
          </h2>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '16px 20px', 
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#6b7280',
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}>
                  STEP
                </th>
                <th style={{ 
                  textAlign: 'right', 
                  padding: '16px 20px', 
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#6b7280',
                }}>
                  UNIQUE VISITORS
                </th>
                <th style={{ 
                  textAlign: 'right', 
                  padding: '16px 20px', 
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#6b7280',
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}>
                  CONVERSION RATE
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '20px', fontSize: 15, color: '#374151' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '50%', 
                      backgroundColor: '#dbeafe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#1e40af',
                    }}>
                      1
                    </div>
                    <span style={{ fontWeight: 500 }}>Onboarding Completed</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: 18, color: '#111827', padding: '20px' }}>
                  {data.funnel.onboarding}
                </td>
                <td style={{ textAlign: 'right', padding: '20px' }}>
                  <span style={{ 
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: 14,
                  }}>
                    100%
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '20px', fontSize: 15, color: '#374151' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '50%', 
                      backgroundColor: '#fef3c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#92400e',
                    }}>
                      2
                    </div>
                    <span style={{ fontWeight: 500 }}>Resume Clicked</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: 18, color: '#111827', padding: '20px' }}>
                  {data.funnel.resume}
                </td>
                <td style={{ textAlign: 'right', padding: '20px' }}>
                  <span style={{ 
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: 14,
                  }}>
                    {onboardingToResume}%
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '20px', fontSize: 15, color: '#374151' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '50%', 
                      backgroundColor: '#e9d5ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#6b21a8',
                    }}>
                      3
                    </div>
                    <span style={{ fontWeight: 500 }}>Contact Clicked</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: 18, color: '#111827', padding: '20px' }}>
                  {data.funnel.contact}
                </td>
                <td style={{ textAlign: 'right', padding: '20px' }}>
                  <span style={{ 
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: 14,
                  }}>
                    {resumeToContact}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      {/* Role Breakdown */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 32,
        marginBottom: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <h2 style={{ 
          fontSize: 24, 
          fontWeight: 700, 
          marginBottom: 24,
          color: '#111827',
        }}>
          Funnel by Role
        </h2>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ 
                textAlign: 'left', 
                padding: '16px 20px', 
                fontWeight: 600,
                fontSize: 14,
                color: '#6b7280',
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}>
                ROLE
              </th>
              <th style={{ 
                textAlign: 'right', 
                padding: '16px 20px', 
                fontWeight: 600,
                fontSize: 14,
                color: '#6b7280',
              }}>
                ONBOARDING
              </th>
              <th style={{ 
                textAlign: 'right', 
                padding: '16px 20px', 
                fontWeight: 600,
                fontSize: 14,
                color: '#6b7280',
              }}>
                RESUME
              </th>
              <th style={{ 
                textAlign: 'right', 
                padding: '16px 20px', 
                fontWeight: 600,
                fontSize: 14,
                color: '#6b7280',
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              }}>
                CONTACT
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.roleBreakdown).map(([role, counts], index) => (
              <tr 
                key={role} 
                style={{ 
                  borderBottom: index < Object.entries(data.roleBreakdown).length - 1 ? '1px solid #f3f4f6' : 'none',
                }}
              >
                <td style={{ 
                  padding: '18px 20px', 
                  textTransform: 'capitalize',
                  fontWeight: 500,
                  fontSize: 15,
                  color: '#374151',
                }}>
                  {role.replace('-', ' ')}
                </td>
                <td style={{ 
                  textAlign: 'right', 
                  padding: '18px 20px',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#111827',
                }}>
                  {counts.onboarding}
                </td>
                <td style={{ 
                  textAlign: 'right', 
                  padding: '18px 20px',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#111827',
                }}>
                  {counts.resume}
                </td>
                <td style={{ 
                  textAlign: 'right', 
                  padding: '18px 20px',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#111827',
                }}>
                  {counts.contact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <h2 style={{ 
          fontSize: 24, 
          fontWeight: 700, 
          marginBottom: 24,
          color: '#111827',
        }}>
          Recent Activity (Last 14 Days)
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '16px 20px', 
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#6b7280',
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}>
                  DATE
                </th>
                <th style={{ 
                  textAlign: 'right', 
                  padding: '16px 20px', 
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#6b7280',
                }}>
                  ONBOARDING
                </th>
                <th style={{ 
                  textAlign: 'right', 
                  padding: '16px 20px', 
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#6b7280',
                }}>
                  RESUME
                </th>
                <th style={{ 
                  textAlign: 'right', 
                  padding: '16px 20px', 
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#6b7280',
                }}>
                  CONTACT
                </th>
                <th style={{ 
                  textAlign: 'right', 
                  padding: '16px 20px', 
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#6b7280',
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}>
                  PROJECTS
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.activityByDate)
                .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
                .slice(0, 14)
                .map(([date, events], index, array) => (
                  <tr 
                    key={date} 
                    style={{ 
                      borderBottom: index < array.length - 1 ? '1px solid #f3f4f6' : 'none',
                    }}
                  >
                    <td style={{ 
                      padding: '18px 20px',
                      fontWeight: 500,
                      fontSize: 15,
                      color: '#374151',
                    }}>
                      {date}
                    </td>
                    <td style={{ 
                      textAlign: 'right', 
                      padding: '18px 20px',
                      fontSize: 15,
                      color: '#6b7280',
                    }}>
                      {events['onboarding_completed'] || 0}
                    </td>
                    <td style={{ 
                      textAlign: 'right', 
                      padding: '18px 20px',
                      fontSize: 15,
                      color: '#6b7280',
                    }}>
                      {events['resume_clicked'] || 0}
                    </td>
                    <td style={{ 
                      textAlign: 'right', 
                      padding: '18px 20px',
                      fontSize: 15,
                      color: '#6b7280',
                    }}>
                      {events['contact_clicked'] || 0}
                    </td>
                    <td style={{ 
                      textAlign: 'right', 
                      padding: '18px 20px',
                      fontSize: 15,
                      color: '#6b7280',
                    }}>
                      {events['project_clicked'] || 0}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
}

// KPI Card Component
function KPICard({ 
  title, 
  value, 
  description,
  color,
}: { 
  title: string; 
  value: number; 
  description: string;
  color: string;
}) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 28,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.2s',
    }}>
      <div style={{ 
        fontSize: 13, 
        color: '#6b7280', 
        marginBottom: 12,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {title}
      </div>
      <div style={{ 
        fontSize: 40, 
        fontWeight: 700, 
        marginBottom: 8,
        color: color,
      }}>
        {value.toLocaleString()}
      </div>
      <div style={{ 
        fontSize: 14, 
        color: '#9ca3af',
        fontWeight: 500,
      }}>
        {description}
      </div>
    </div>
  );
}
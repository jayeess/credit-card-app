import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Generate a short readable application ID like CC-A1B2C3
function generateApplicationId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars like 0, O, 1, I
  let result = 'CC-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      employmentType,
      companyName,
      salary,
      salaryCertificate,
      nationalId,
    } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !employmentType) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check eligibility
    if (employmentType === 'student' || employmentType === 'unemployed') {
      return NextResponse.json(
        { success: false, message: 'Not eligible for credit card application' },
        { status: 400 }
      );
    }

    const monthlySalary = salary ? parseFloat(salary) : null;
    if (monthlySalary && monthlySalary < 10000) {
      return NextResponse.json(
        { success: false, message: 'Minimum salary requirement not met' },
        { status: 400 }
      );
    }

    // Generate a short application reference ID
    const applicationRef = generateApplicationId();

    // Create application in database
    const application = await prisma.application.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        employmentType,
        companyName: companyName || null,
        monthlySalary: monthlySalary,
        salaryCertName: salaryCertificate?.name || null,
        nationalIdName: nationalId?.name || null,
        status: 'under_review',
      },
    });

    return NextResponse.json({
      success: true,
      id: applicationRef,
      dbId: application.id,
      status: application.status,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return NextResponse.json({
      success: true,
      data: applications,
      count: applications.length,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

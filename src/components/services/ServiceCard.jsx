import { MapPinIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function ServiceCard({ service }) {
    return (
        <article className="card flex h-full flex-col p-6">
            <div className="flex items-start gap-4">
                <span className="text-4xl" aria-hidden="true">
                    {service.icon}
                </span>
                <div>
                    <h3 className="text-2xl md:text-2xl">{service.name}</h3>
                    <p className="mt-1 font-semibold text-burgundy-700">
                        {service.day}, {service.time} to {service.endTime}
                    </p>
                </div>
            </div>

            <p className="mt-4 leading-relaxed text-charcoal-light">{service.description}</p>

            <ul className="mt-4 space-y-2 text-sm text-charcoal-light">
                <li className="flex gap-2">
                    <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                    <span>{service.venue || 'Main church building'}</span>
                </li>
                {service.ageGroup && (
                    <li className="flex gap-2">
                        <UserGroupIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                        <span>Age group: {service.ageGroup}</span>
                    </li>
                )}
            </ul>

            {service.safetyInfo && (
                <div className="mt-5 rounded-xl border border-gold-200 bg-gold-50 p-4 text-sm">
                    <p className="flex items-center gap-2 font-semibold text-burgundy-700">
                        <ShieldCheckIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                        Safe and secure check-in
                    </p>
                    <p className="mt-1 leading-relaxed text-charcoal-light">{service.safetyInfo}</p>
                </div>
            )}
        </article>
    );
}